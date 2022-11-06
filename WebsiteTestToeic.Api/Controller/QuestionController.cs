using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
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
        private readonly IHostingEnvironment _environment;
        public QuestionController(IQuestionRepository questionRepository, IHostingEnvironment environment)
        {
            _questionRepository = questionRepository;
            _environment = environment;
        }
        [HttpGet("GetAllQuestion"), Authorize(Roles = "Client, Admin")]
        public async Task<ActionResult<List<Question>>> GetAllQuestions(int QuizId)
        {
            return Ok(await _questionRepository.GetAllQuestions(QuizId));
        }
        [HttpGet("GetQuestionById"), Authorize(Roles = "Client, Admin")]
        public async Task<ActionResult<Question>> GetQuestionById(int Id)
        {
            return Ok(await _questionRepository.GetQuestionById(Id));
        }
        [HttpPost("AddQuestion"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<Question>> AddQuestion([FromForm] Question question)
        {
            //upload Image
            var file = _environment.ContentRootPath;
            string path = Path.Combine(file+"\\Image-LuanVan", question.Image);
            using (var stream = System.IO.File.Create(path))
            {
                question.FileImages.CopyTo(stream);
            }
            return Ok(await _questionRepository.AddQuestion(question));
        }
    }
}
