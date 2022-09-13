
using Microsoft.EntityFrameworkCore;
using WebsiteTestToeic.Database.DatabaseContext;
using WebsiteTestToeic.Database.DbContextFactory;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Database.Implement
{
    public class TestRepository : ITestRepository
    {
        private TestToeicDbContext _context;
        public TestRepository(TestToeicDbContext context = null)
        {
            if (context == null)
                _context = TestToeicDbContextFactory.GetDbContext();
            else _context = context;
        }
        public async Task<Test> AddTest(Test test)
        {
            Test t = new Test()
            {
                ExamTime = test.ExamTime,
                TypeTest = test.TypeTest,
                NumQuestion = test.NumQuestion
            };
            await _context.AddAsync(t);
            await _context.SaveChangesAsync();
            return t;
        }

        public async Task<bool> DeleteTest(int id)
        {
            bool result = false;
            if(id != null)
            {
                Test t = await _context.Tests.FirstOrDefaultAsync(e=> e.Id == id);
                if(t != null)
                {
                    _context.Tests.Remove(t);
                    await _context.SaveChangesAsync();
                    result = true;
                }
            }
            return result;
        }

        public async Task<List<Test>> GetAllTests()
        {
            List<Test> ListTest;
            ListTest = await _context.Tests.ToListAsync();
            return ListTest;
        }

        public async Task<Test> GetTest(int id)
        {
            Test t =await  _context.Tests.FirstOrDefaultAsync(e=> e.Id == id);
            if (t != null)
                return t;
            return null;
        }

        public async Task<Test> UpdateTest(Test test)
        {
            Test t = await _context.Tests.FirstOrDefaultAsync(t => t.Id == test.Id);
            if (t != null)
            {
                t.ExamTime = test.ExamTime;
                t.TypeTest = test.TypeTest;
                t.NumQuestion = test.NumQuestion;
                await _context.SaveChangesAsync();
                return t;
            }
            return null;
        }
    }
}
