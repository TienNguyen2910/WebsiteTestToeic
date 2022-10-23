using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Api.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class ResultDetailController : ControllerBase
    {
        private readonly IResultDetailRepository _resultDetailRepository;
        public ResultDetailController(IResultDetailRepository resultDetailRepository)
        {
            _resultDetailRepository = resultDetailRepository;
        }
        [HttpGet("GetAllResultDetails"), Authorize(Roles = "Client, Admin")]
        public async Task<ActionResult<List<ResultDetail>>> GetAllResultDetails()
        {
            return Ok(await _resultDetailRepository.GetAllResultDetails());
        }
        [HttpGet("GetResultDetail/{Id}"), Authorize(Roles = "Client, Admin")]
        public async Task<ActionResult<ResultDetail>> GetResultDetail(int Id)
        {
            return Ok(await _resultDetailRepository.GetResultDetail(Id));
        }
        [HttpPost("AddResultDetail"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<bool>> AddResult(List<ResultDetail> resultDetails)
        {
            bool temp = false;
            foreach(var resultDetail in resultDetails)
                temp = await _resultDetailRepository.AddResultDetail(resultDetail);
            return Ok(temp);
        }
    }
}
