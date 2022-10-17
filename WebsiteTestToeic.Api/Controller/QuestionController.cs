using Microsoft.AspNetCore.Mvc;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Api.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class QuestionController : ControllerBase
    {
        private readonly IQuestionRepository _questionRepository;
        public QuestionController(IQuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
        }
        [HttpGet("GetAllQuestion")]
        public async Task<ActionResult<List<Question>>> GetAllQuestions(int QuizId)
        {
            return Ok(await _questionRepository.GetAllQuestions(QuizId));
        }
        [HttpGet("GetQuestionById")]
        public async Task<ActionResult<Question>> GetQuestionById(int Id)
        {
            return Ok(await _questionRepository.GetQuestionById(Id));
        }
        [HttpPost("AddQuestion")]
        public async Task<ActionResult<Question>> AddQuestion(Question question)
        {
            return Ok(await _questionRepository.AddQuestion(question));
        }
    }
}
