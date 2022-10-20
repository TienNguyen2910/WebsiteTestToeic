using Microsoft.EntityFrameworkCore;
using WebsiteTestToeic.Database.DatabaseContext;
using WebsiteTestToeic.Database.DbContextFactory;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Database.Implement
{
    public class ResultDetailRepository : IResultDetailRepository
    {
        private readonly TestToeicDbContext _context;
        public ResultDetailRepository(TestToeicDbContext context)
        {
            if (context == null)
                _context = TestToeicDbContextFactory.GetDbContext();
            _context = context;
        }

        public async Task<bool> AddResultDetail(ResultDetail resultDetail)
        {
            bool temp = false;
            ResultDetail r = new ResultDetail()
            {
                QuestionId = resultDetail.QuestionId,
                ResultId = resultDetail.ResultId,
                AnswerSelectedId = resultDetail.AnswerSelectedId
            };
            if(r != null)
            {
                await _context.AddAsync(r);
                await _context.SaveChangesAsync();
                temp = true;
            }
            return temp;
        }

        public async Task<List<ResultDetail>> GetAllResultDetails()
        {
            List<ResultDetail> resultDetailList = await _context.ResultDetail.ToListAsync();
            return resultDetailList;
        }

        public async Task<ResultDetail> GetResultDetail(int Id)
        {
            ResultDetail resultDetail = await _context.ResultDetail.FirstOrDefaultAsync(r => r.Id == Id);
            if (resultDetail != null)
                return resultDetail;
            return null;
        }
    }
}
