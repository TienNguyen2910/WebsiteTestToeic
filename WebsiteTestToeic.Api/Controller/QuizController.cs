using Microsoft.AspNetCore.Mvc;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Api.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class QuizController : ControllerBase
    {
        private readonly IQuizRepository _quizrepository;
        public QuizController(IQuizRepository quizRepository)
        {
            _quizrepository = quizRepository;
        }
        [HttpGet]
        public async Task<ActionResult<List<Quiz>> GetAllQuizs()
        {             
            return Ok(await _quizrepository.GetAllQuizs());
        }
        [HttpGet("id:int")]
        public  async Task<ActionResult<Quiz>> GetQuizById(int id)
        {
            return Ok(await _quizrepository.GetQuiz(id));
        }
        [HttpPost]
        public async Task<ActionResult<Quiz>> AddQuiz(Quiz quiz)
        {
        return Ok(await _quizrepository.AddQuiz(quiz));
        }
    }
}
