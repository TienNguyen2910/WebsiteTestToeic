using Microsoft.AspNetCore.Mvc;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace WebsiteTestToeic.Api.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class AnswerController : ControllerBase
    {
        private readonly IAnswerRepository _answerRepository;
        public AnswerController(IAnswerRepository answerRepository)
        {
            _answerRepository = answerRepository;
        }
        [HttpGet("GetAllAnswers"), Authorize(Roles = "Client, Admin")]
        public async Task<ActionResult<List<Answer>>> GetAllAnswers(int QuestionId)
        {
            List<Answer> answerList = await _answerRepository.GetAllAnswer(QuestionId);
            Console.WriteLine(answerList);
            return Ok(answerList);
        }
        [HttpPost("AddAnswer"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<Answer>> AddAnswer(Answer answer)
        {
            return Ok(await _answerRepository.AddAnswer(answer));
        }
        [HttpDelete("DeleteAnswer/{Id}"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<bool>> DeleteAnswer(int Id)
        {
            Answer answer = await _answerRepository.GetAnswer(Id);
            if (answer == null)
                return false;
            return Ok(await _answerRepository.DeleteAnswer(Id));
        }
    }
}
