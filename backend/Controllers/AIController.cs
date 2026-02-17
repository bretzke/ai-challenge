using Microsoft.AspNetCore.Mvc;
using ECommerceAPI.DTOs;
using ECommerceAPI.Services;

namespace ECommerceAPI.Controllers;

[ApiController]
[Route("api/ai")]
public class AIController : ControllerBase
{
    private readonly IAIService _aiService;

    public AIController(IAIService aiService)
    {
        _aiService = aiService;
    }

    [HttpPost("query")]
    public async Task<ActionResult<AIResponseDto>> ProcessQuery([FromBody] AIQueryDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Question))
        {
            return BadRequest(new { error = "Question is required" });
        }

        var response = await _aiService.ProcessQueryAsync(dto.Question);
        return Ok(response);
    }
}
