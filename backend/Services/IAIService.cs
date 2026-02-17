using ECommerceAPI.DTOs;

namespace ECommerceAPI.Services;

public interface IAIService
{
    Task<AIResponseDto> ProcessQueryAsync(string question);
}
