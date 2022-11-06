using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Api.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class ResultController : ControllerBase
    {
        private readonly IResultRepository _resultRepository;
        public ResultController(IResultRepository resultRepository)
        {
            _resultRepository = resultRepository;
        }
        [HttpGet("GetAllResults")]
        public async Task<ActionResult<List<Result>>> GetAllResults()
        {
            return Ok(await _resultRepository.GetAllResults());
        }
        [HttpGet("GetResult/{Id}")]
        public async Task<ActionResult<Result>> GetResult(int Id)
        {
            return Ok(await _resultRepository.GetResult(Id));
        }
        [HttpPost("AddResult"), Authorize(Roles = "Client, Admin")]
        public async Task<ActionResult<int>> AddResult(Result result)
        {
            return Ok(await _resultRepository.AddResult(result));
        }
    }
}
