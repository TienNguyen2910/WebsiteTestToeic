using Microsoft.EntityFrameworkCore;
using WebsiteTestToeic.Database.DatabaseContext;
using WebsiteTestToeic.Database.DbContextFactory;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Database.Implement
{
    public class ResultRepository : IResultRepository
    {
        private readonly TestToeicDbContext _context;
        public ResultRepository(TestToeicDbContext context)
        {
            if(context == null)
                _context = TestToeicDbContextFactory.GetDbContext();
            _context = context;
        }
        public async Task<int> AddResult(Result result)
        {
            Result r = new Result()
            {
                UserId = result.UserId,
                QuizId = result.QuizId,
                StartedAt = result.StartedAt,
                EndedAt = result.EndedAt,
                Score = result.Score
            };
            if( r != null)
            {
                await _context.Results.AddAsync(r);
                await _context.SaveChangesAsync();
                return r.Id;
            }
            return -1;
        }

        public async Task<List<Result>> GetAllResults()
        {
            List<Result> results = _context.Results.Include(r => r.User).OrderByDescending(r => r.Score).ToList();
            return results;
        }

        public async Task<Result> GetResult(int id)
        {
            Result result = await _context.Results.Include(r => r.ResultDetailsList).FirstOrDefaultAsync(r => r.Id == id);
            if (result != null)
                return result;
            return null;
        }
    }
}
