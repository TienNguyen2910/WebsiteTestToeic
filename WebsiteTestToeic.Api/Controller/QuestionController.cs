using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
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
        public async Task<ActionResult<bool>> AddQuestion(List<Question> questions)
        {
            bool result = true;
            foreach (var question in questions)
            {
                result = await _questionRepository.AddQuestion(question);
            }
            return Ok(result);
        }
        [HttpPost("UploadFile"), Authorize(Roles = "Admin")]
        [DisableRequestSizeLimit()]
        public async Task<ActionResult> UploadFile(List<IFormFile> files)
        {
            foreach (var f in files)
            {
                bool isImageFile = f.ContentType == "image/png";
                var file = _environment.ContentRootPath;
                string pathAudio;
                if (isImageFile)
                    pathAudio = Path.Combine(file + "\\Image-LuanVan", f.FileName);
                else pathAudio = Path.Combine(file + "\\File-audio", f.FileName);
                using (var stream = System.IO.File.Create(pathAudio))
                {
                    f.CopyTo(stream);
                }
            }
            return Ok();
        }
    }
}
