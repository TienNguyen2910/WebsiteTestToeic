using WebsiteTestToeic.Database.DatabaseContext;
using WebsiteTestToeic.Database.DbContextFactory;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace WebsiteTestToeic.Database.Implement
{
    public class AnswerRepository : IAnswerRepository
    {
        private readonly TestToeicDbContext _context;
        public AnswerRepository(TestToeicDbContext context = null)
        {
            if(context == null)
                _context = TestToeicDbContextFactory.GetDbContext();
            _context = context;
        }
        public async Task<List<Answer>> GetAllAnswer(int QuestionId)
        {
            List<Answer> answers = await _context.Answers.Where(a => a.QuestionId == QuestionId).ToListAsync();
            return answers;
        }
        public async Task<Answer> GetAnswer(int Id)
        {
            Answer a = await _context.Answers.FirstOrDefaultAsync(a => a.Id == Id);
            if (a == null)
                return null;
            return a;
        }
        public async Task<Answer> AddAnswer(Answer answer)
        {
            Answer a = new Answer()
            {
                QuestionId = answer.QuestionId,
                ContentAnswer = answer.ContentAnswer,
                IsAnswer = answer.IsAnswer,
            };
            await _context.Answers.AddAsync(a);
            await _context.SaveChangesAsync();
            return a;
        }
        public async Task<Answer> UpdateAnswer(Answer answer)
        {
            Answer a = await _context.Answers.FirstOrDefaultAsync(a => a.Id == answer.Id);
            if(a != null)
            {
                a.ContentAnswer = answer.ContentAnswer;
                a.QuestionId = answer.QuestionId;
                a.IsAnswer = answer.IsAnswer;
                await _context.SaveChangesAsync();
                return a;
            }
            return null;
        }
        public async Task<bool> DeleteAnswer(int Id)
        {
            Answer a = await _context.Answers.FirstOrDefaultAsync(a => a.Id == Id);
            if(a != null)
            {
                _context.Answers.Remove(a);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}
