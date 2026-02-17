namespace ECommerceAPI.DTOs;

public class AIResponseDto
{
    public string Answer { get; set; } = string.Empty;
    public string? Sql { get; set; }
    public object? Data { get; set; }
}
