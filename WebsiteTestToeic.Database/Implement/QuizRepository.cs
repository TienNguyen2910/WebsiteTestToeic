using WebsiteTestToeic.Database.DatabaseContext;
using WebsiteTestToeic.Database.DbContextFactory;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace WebsiteTestToeic.Database.Implement
{
    public class QuizRepository : IQuizRepository
    {
        private TestToeicDbContext _context;
        public QuizRepository(TestToeicDbContext context = null)
        {
            if (context == null)
                _context = TestToeicDbContextFactory.GetDbContext();
            else _context = context;
        }
        public async Task<Quiz> AddQuiz(Quiz quiz)
        {
            Quiz q = new Quiz()
            {
                Title = quiz.Title,
                TestId = quiz.TestId,
                ActorId = quiz.ActorId
            };
            await _context.Quizzes.AddAsync(q);
            await _context.SaveChangesAsync();
            return q;
        }

        public async Task<bool> DeleteQuiz(int id)
        {
            bool result = false;
            Quiz quiz = await _context.Quizzes.FirstOrDefaultAsync(q => q.Id == id);
            if(quiz != null)
            {
                _context.Quizzes.Remove(quiz);
                await _context.SaveChangesAsync();
                result = true;
            }
            return result;
        }

        public async Task<List<Quiz>> GetAllQuizs()
        {
            List<Quiz> listQuiz = await _context.Quizzes.ToListAsync();
            return listQuiz;
        }

        public async Task<Quiz> GetQuiz(int id)
        {
            Quiz quiz = await _context.Quizzes.FirstOrDefaultAsync(q => q.Id == id);
            if(quiz != null)
                return quiz;
            return null;
        }

        public async Task<Quiz> UpdateQuiz(Quiz quiz)
        {
            Quiz q = await _context.Quizzes.FindAsync(quiz.Id);
            if(quiz != null){
                q.Title = quiz.Title;
                q.TestId = quiz.TestId;
                q.ActorId = quiz.ActorId;
                await _context.SaveChangesAsync();
                return q;
            }
            return null;
        }
    }
}