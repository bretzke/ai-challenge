namespace ECommerceAPI.Services;

public interface IGeminiService
{
    Task<string> GenerateSQLAsync(string question, string schemaInfo);
    Task<string> GenerateNaturalLanguageAnswerAsync(string question, List<Dictionary<string, object>> data);
}
