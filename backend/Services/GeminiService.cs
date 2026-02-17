using System.Text;
using System.Text.RegularExpressions;
using Newtonsoft.Json;

namespace ECommerceAPI.Services;

public class GeminiService : IGeminiService
{
    private readonly HttpClient _httpClient;
    private readonly IConfiguration _configuration;
    private readonly ILogger<GeminiService> _logger;
    private readonly string _apiKey;
    private readonly string _modelName;
    private readonly string _apiVersion;
    private readonly string _apiBaseUrl;

    public GeminiService(HttpClient httpClient, IConfiguration configuration, ILogger<GeminiService> logger)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _logger = logger;
        _apiKey = _configuration["Gemini:ApiKey"] ?? throw new InvalidOperationException("Gemini API Key not configured");
        _modelName = _configuration["Gemini:Model"] ?? "gemini-pro"; // Default to gemini-pro (most stable)
        
        // Use stable v1 API by default, allow override to v1beta for experimental features
        _apiVersion = _configuration["Gemini:ApiVersion"] ?? "v1"; // v1 = stable, v1beta = experimental
        _apiBaseUrl = $"https://generativelanguage.googleapis.com/{_apiVersion}/models";
        
        _logger.LogInformation($"Using Gemini API version: {_apiVersion} (v1=stable, v1beta=experimental)");
        
        // Set timeout for API calls
        _httpClient.Timeout = TimeSpan.FromSeconds(30);
        
        // Configure API key header
        ConfigureHttpClient();
    }
    
    private string GetApiUrl() => $"{_apiBaseUrl}/{_modelName}:generateContent";
    
    private void ConfigureHttpClient()
    {
        // Clear any existing headers first
        _httpClient.DefaultRequestHeaders.Clear();
        
        // Set API key as header (preferred method according to Google docs)
        _httpClient.DefaultRequestHeaders.Add("x-goog-api-key", _apiKey);
    }
    
    private async Task<HttpResponseMessage> TryGenerateContentAsync(string url, StringContent content, bool useQueryParam = false)
    {
        string finalUrl = url;
        HttpClient client = _httpClient;
        
        if (useQueryParam)
        {
            finalUrl = $"{url}?key={_apiKey}";
            // Create a new client without the header for query param method
            client = new HttpClient();
            client.Timeout = TimeSpan.FromSeconds(30);
        }
        else
        {
            // Ensure header is set
            if (!client.DefaultRequestHeaders.Contains("x-goog-api-key"))
            {
                client.DefaultRequestHeaders.Add("x-goog-api-key", _apiKey);
            }
        }
        
        var response = await client.PostAsync(finalUrl, content);
        return response;
    }

    public async Task<string> GenerateSQLAsync(string question, string schemaInfo)
    {
        try
        {
            var prompt = BuildSQLPrompt(question, schemaInfo);

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                },
                generationConfig = new
                {
                    temperature = 0.1,
                    topK = 40,
                    topP = 0.95,
                    maxOutputTokens = 1024,
                }
            };

            var json = JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var url = GetApiUrl();
            _logger.LogInformation($"Calling Gemini API: {url} with model: {_modelName}");
            
            // Try with header first (preferred method)
            HttpResponseMessage response = await TryGenerateContentAsync(url, content, useQueryParam: false);
            string responseContent = await response.Content.ReadAsStringAsync();
            
            // If 404, try with query parameter
            if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                _logger.LogWarning($"404 with header method, trying query parameter method");
                response = await TryGenerateContentAsync(url, content, useQueryParam: true);
                responseContent = await response.Content.ReadAsStringAsync();
            }
            
            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError($"Gemini API error {response.StatusCode}: {responseContent}");
                throw new HttpRequestException($"Gemini API returned {response.StatusCode}: {responseContent}");
            }
            var geminiResponse = JsonConvert.DeserializeObject<GeminiResponse>(responseContent);

            if (geminiResponse?.Candidates == null || geminiResponse.Candidates.Length == 0)
            {
                _logger.LogWarning("Gemini returned empty response");
                return string.Empty;
            }

            var candidate = geminiResponse.Candidates[0];
            if (candidate?.Content?.Parts == null || candidate.Content.Parts.Length == 0)
            {
                _logger.LogWarning("Gemini response missing content parts");
                return string.Empty;
            }

            var sql = candidate.Content.Parts[0].Text?.Trim() ?? string.Empty;
            
            // Extract SQL from markdown code blocks if present
            sql = ExtractSQLFromMarkdown(sql);
            
            // Validate SQL
            if (!ValidateSQL(sql))
            {
                _logger.LogWarning($"Invalid SQL generated: {sql}");
                return string.Empty;
            }

            return sql;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error calling Gemini API");
            throw;
        }
    }

    public async Task<string> GenerateNaturalLanguageAnswerAsync(string question, List<Dictionary<string, object>> data)
    {
        try
        {
            var dataJson = JsonConvert.SerializeObject(data, Formatting.Indented);
            
            var prompt = $@"Você é um assistente de IA que ajuda usuários a entender dados de um e-commerce.

Pergunta do usuário: {question}

Dados retornados da consulta:
{dataJson}

Gere uma resposta clara, natural e útil em português brasileiro baseada nos dados acima. 
Seja conciso mas informativo. Se não houver dados, explique isso de forma amigável.";

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                },
                generationConfig = new
                {
                    temperature = 0.7,
                    topK = 40,
                    topP = 0.95,
                    maxOutputTokens = 1024,
                }
            };

            var json = JsonConvert.SerializeObject(requestBody);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var url = GetApiUrl();
            _logger.LogInformation($"Calling Gemini API for natural language: {url} with model: {_modelName}");
            
            // Try with header first (preferred method)
            HttpResponseMessage response = await TryGenerateContentAsync(url, content, useQueryParam: false);
            string responseContent = await response.Content.ReadAsStringAsync();
            
            // If 404, try with query parameter
            if (response.StatusCode == System.Net.HttpStatusCode.NotFound)
            {
                _logger.LogWarning($"404 with header method, trying query parameter method");
                response = await TryGenerateContentAsync(url, content, useQueryParam: true);
                responseContent = await response.Content.ReadAsStringAsync();
            }
            
            if (!response.IsSuccessStatusCode)
            {
                _logger.LogError($"Gemini API error {response.StatusCode}: {responseContent}");
                return "Não foi possível gerar uma resposta em linguagem natural devido a um erro na API.";
            }
            var geminiResponse = JsonConvert.DeserializeObject<GeminiResponse>(responseContent);

            if (geminiResponse?.Candidates == null || geminiResponse.Candidates.Length == 0)
            {
                return "Não foi possível gerar uma resposta baseada nos dados.";
            }

            var candidate = geminiResponse.Candidates[0];
            if (candidate == null)
            {
                return "Não foi possível gerar uma resposta baseada nos dados.";
            }
            if (candidate?.Content?.Parts == null || candidate.Content.Parts.Length == 0)
            {
                return "Não foi possível gerar uma resposta baseada nos dados.";
            }

            return candidate.Content.Parts[0].Text?.Trim() ?? "Não foi possível gerar uma resposta.";
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error generating natural language answer with Gemini");
            return "Não foi possível gerar uma resposta em linguagem natural.";
        }
    }

    private string BuildSQLPrompt(string question, string schemaInfo)
    {
        return $@"Você é um especialista em SQL e conversão de linguagem natural para SQL (NL2SQL).

Esquema do banco de dados:
{schemaInfo}

IMPORTANTE:
- Gere APENAS uma consulta SQL válida
- Use apenas SELECT (nunca INSERT, UPDATE, DELETE, DROP, ALTER)
- Não use funções perigosas ou comandos de sistema
- Use nomes de tabelas e colunas exatamente como mostrado no esquema
- Retorne apenas o SQL, sem explicações adicionais
- Se a pergunta não puder ser respondida com SQL, retorne apenas 'INVALID'

Pergunta do usuário: {question}

SQL:";
    }

    private string ExtractSQLFromMarkdown(string text)
    {
        // Remove markdown code blocks if present
        var sqlCodeBlockPattern = @"```(?:sql)?\s*(.*?)```";
        var match = Regex.Match(text, sqlCodeBlockPattern, RegexOptions.Singleline | RegexOptions.IgnoreCase);
        if (match.Success)
        {
            return match.Groups[1].Value.Trim();
        }

        // Remove inline code if present
        text = Regex.Replace(text, @"`([^`]+)`", "$1");

        return text.Trim();
    }

    private bool ValidateSQL(string sql)
    {
        if (string.IsNullOrWhiteSpace(sql) || sql.Equals("INVALID", StringComparison.OrdinalIgnoreCase))
        {
            return false;
        }

        // Convert to uppercase for validation
        var upperSql = sql.ToUpper().Trim();

        // Only allow SELECT statements
        if (!upperSql.StartsWith("SELECT"))
        {
            return false;
        }

        // Block dangerous keywords
        var dangerousKeywords = new[] { "INSERT", "UPDATE", "DELETE", "DROP", "ALTER", "CREATE", "TRUNCATE", "EXEC", "EXECUTE", "EXECUTE_IMMEDIATE" };
        foreach (var keyword in dangerousKeywords)
        {
            if (upperSql.Contains(keyword))
            {
                return false;
            }
        }

        // Block SQL injection patterns
        var injectionPatterns = new[] { "--", "/*", "*/", "xp_", "sp_", "UNION", "SCRIPT", "JAVASCRIPT" };
        foreach (var pattern in injectionPatterns)
        {
            if (upperSql.Contains(pattern))
            {
                return false;
            }
        }

        return true;
    }

    // Response models for Gemini API
    private class GeminiResponse
    {
        [JsonProperty("candidates")]
        public Candidate[]? Candidates { get; set; }
    }

    private class Candidate
    {
        [JsonProperty("content")]
        public Content? Content { get; set; }
    }

    private class Content
    {
        [JsonProperty("parts")]
        public Part[]? Parts { get; set; }
    }

    private class Part
    {
        [JsonProperty("text")]
        public string? Text { get; set; }
    }
}
