
using Microsoft.AspNetCore.Mvc;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Api.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class TestController : ControllerBase
    {
        //method dependency Injection
        private readonly ITestRepository _testRepository;
        public TestController(ITestRepository testRepository)
        {
            _testRepository = testRepository;
        }
        [HttpGet]
        public async Task<ActionResult<List<Test>>> GetAllTests()
        {
           return Ok(await _testRepository.GetAllTests());
        }
        [HttpGet("{id:int}")]
        public async Task<ActionResult<Test>> GetTest(int id)
        {
            return Ok(await _testRepository.GetTest(id));
        }
        [HttpPost]
        public async Task<ActionResult<Test>> AddTest(Test test)
        {
            return Ok(await _testRepository.AddTest(test));
        }
        [HttpPut("{id:int}")]
        public async Task<ActionResult<Test>> UpdateTest(int id,Test test)
        {
            Test t = await _testRepository.GetTest(id);
            if (t == null)
                return NotFound("Test Id = {id} not found");
            return Ok(await _testRepository.UpdateTest(test));
        }
        [HttpDelete("{id:int}")]
        public async Task<ActionResult<bool>> DeleteTest(int id)
        {
            Test t = await _testRepository.GetTest(id);
            if (t == null)
                return NotFound("Test Id = {id} not found");
            return Ok(await _testRepository.DeleteTest(id));
        }
    }
}
