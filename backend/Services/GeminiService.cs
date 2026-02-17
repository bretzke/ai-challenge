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
    private readonly string _apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

    public GeminiService(HttpClient httpClient, IConfiguration configuration, ILogger<GeminiService> logger)
    {
        _httpClient = httpClient;
        _configuration = configuration;
        _logger = logger;
        _apiKey = _configuration["Gemini:ApiKey"] ?? throw new InvalidOperationException("Gemini API Key not configured");
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

            var response = await _httpClient.PostAsync($"{_apiUrl}?key={_apiKey}", content);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var geminiResponse = JsonConvert.DeserializeObject<GeminiResponse>(responseContent);

            if (geminiResponse?.Candidates == null || geminiResponse.Candidates.Length == 0)
            {
                _logger.LogWarning("Gemini returned empty response");
                return string.Empty;
            }

            var sql = geminiResponse.Candidates[0].Content.Parts[0].Text.Trim();
            
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

            var response = await _httpClient.PostAsync($"{_apiUrl}?key={_apiKey}", content);
            response.EnsureSuccessStatusCode();

            var responseContent = await response.Content.ReadAsStringAsync();
            var geminiResponse = JsonConvert.DeserializeObject<GeminiResponse>(responseContent);

            if (geminiResponse?.Candidates == null || geminiResponse.Candidates.Length == 0)
            {
                return "Não foi possível gerar uma resposta baseada nos dados.";
            }

            return geminiResponse.Candidates[0].Content.Parts[0].Text.Trim();
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
