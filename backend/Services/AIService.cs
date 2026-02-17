using Microsoft.EntityFrameworkCore;
using ECommerceAPI.Data;
using ECommerceAPI.DTOs;

namespace ECommerceAPI.Services;

public class AIService : IAIService
{
    private readonly ApplicationDbContext _context;
    private readonly IGeminiService _geminiService;
    private readonly ILogger<AIService> _logger;

    public AIService(ApplicationDbContext context, IGeminiService geminiService, ILogger<AIService> logger)
    {
        _context = context;
        _geminiService = geminiService;
        _logger = logger;
    }

    public async Task<AIResponseDto> ProcessQueryAsync(string question)
    {
        try
        {
            // Schema information for the AI (table and columns are lowercase in PostgreSQL)
            var schemaInfo = @"
Tabela: products (sempre use 'products' no FROM)
Colunas (use nomes em minúsculas no SQL):
- id (int): ID único do produto
- name (string): Nome do produto
- description (string): Descrição do produto
- price (decimal): Preço do produto em reais
- category (string): Categoria do produto (ex: Eletrônicos, Móveis, Livros)
- stock (int): Quantidade em estoque
- created_at (timestamptz): Data de criação
- updated_at (timestamptz): Data de atualização
";

            // Generate SQL using Gemini
            _logger.LogInformation($"Processing question with Gemini: {question}");
            var sql = await _geminiService.GenerateSQLAsync(question, schemaInfo);
            
            if (string.IsNullOrEmpty(sql))
            {
                return new AIResponseDto
                {
                    Answer = "Desculpe, não consegui entender sua pergunta ou gerar uma consulta SQL válida. Por favor, tente reformular sua pergunta sobre produtos, preços, categorias ou estoque.",
                };
            }

            _logger.LogInformation($"Generated SQL: {sql}");

            // Execute SQL query
            var data = await ExecuteQueryAsync(sql);

            // Generate natural language answer using Gemini
            var answer = await _geminiService.GenerateNaturalLanguageAnswerAsync(question, data);

            return new AIResponseDto
            {
                Answer = answer,
                Sql = sql,
                Data = data
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error processing AI query");
            return new AIResponseDto
            {
                Answer = "Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, tente novamente.",
            };
        }
    }


    private async Task<List<Dictionary<string, object>>> ExecuteQueryAsync(string sql)
    {
        var results = new List<Dictionary<string, object>>();
        
        var connection = _context.Database.GetDbConnection();
        await connection.OpenAsync();

        try
        {
            using var command = connection.CreateCommand();
            command.CommandText = sql;

            using var reader = await command.ExecuteReaderAsync();
            
            while (await reader.ReadAsync())
            {
                var row = new Dictionary<string, object>();
                for (int i = 0; i < reader.FieldCount; i++)
                {
                    var columnName = reader.GetName(i);
                    var value = reader.IsDBNull(i) ? null : reader.GetValue(i);
                    row[columnName] = value ?? DBNull.Value;
                }
                results.Add(row);
            }
        }
        finally
        {
            await connection.CloseAsync();
        }

        return results;
    }

}
