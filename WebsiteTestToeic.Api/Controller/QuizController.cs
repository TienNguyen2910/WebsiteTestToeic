
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Api.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class QuizController : ControllerBase
    {
        //method dependency Injection
        private readonly IQuizRepository _quizRepository;
        public QuizController(IQuizRepository quizRepository)
        {
            _quizRepository = quizRepository;
        }
        [HttpGet]
        public async Task<ActionResult<List<Quiz>>> GetAllQuizs()
        {
            return Ok(await _quizRepository.GetAllQuizs());
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Test>> GetQuiz(int id)
        {
            return Ok(await _quizRepository.GetQuiz(id));
        }
        [HttpPost]
        public async Task<ActionResult<Test>> AddQuiz(Quiz quiz)
        {
            return Ok(await _quizRepository.AddQuiz(quiz));
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Test>> UpdateQuiz(int id, Quiz quiz)
        {
            Quiz q = await _quizRepository.GetQuiz(id);
            if (q == null)
                return NotFound("Test Id = {id} not found");
            return Ok(await _quizRepository.UpdateQuiz(quiz));
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<bool>> DeleteQuiz(int id)
        {
            Quiz q = await _quizRepository.GetQuiz(id);
            if (q == null)
                return NotFound("Test Id = {id} not found");
            return Ok(await _quizRepository.DeleteQuiz(id));
        }
    }
}
