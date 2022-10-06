using WebsiteTestToeic.Database.DatabaseContext;
using WebsiteTestToeic.Database.DbContextFactory;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;
using Microsoft.EntityFrameworkCore;

namespace WebsiteTestToeic.Database.Implement
{
    public class QuestionRepository : IQuestionRepository
    {
        private readonly TestToeicDbContext _context;
        public QuestionRepository(TestToeicDbContext context = null)
        {
            if (context == null)
                _context = TestToeicDbContextFactory.GetDbContext();
            _context = context;
        }
        public async Task<Question> AddQuestion(Question question)
        {
            Question q = new Question()
            {
                Image = question.Image,
                AudioFile = question.AudioFile,
                ContentQuestion = question.ContentQuestion,
                ContentScript = question.ContentScript,
                NumPart = question.NumPart,
                QuizId = question.QuizId,
            };
            await _context.Questions.AddAsync(q);
            await _context.SaveChangesAsync();
            return q;
        }

        public async Task<bool> DeleteQuestion(int Id)
        {
            Question question = await _context.Questions.FirstOrDefaultAsync(q => q.Id == Id);
            if(question != null)
            {
                _context.Questions.Remove(question);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }

        public async Task<List<Question>> GetAllQuestions(int QuizId)
        {
            List<Question> questionList = await _context.Questions.Where(q => q.QuizId == QuizId).ToListAsync();
            return questionList;
        }

        public async Task<Question> GetQuestionById(int Id)
        {
            Question q = await _context.Questions.FirstOrDefaultAsync(q => q.Id == Id);
            if (q != null)
                return q;
            return null;
        }

        public async Task<Question> UpdateQuestion(Question question)
        {
            Question q = await _context.Questions.FirstOrDefaultAsync(q => q.Id == question.Id);
            if(q != null)
            {
                q.Image = question.Image;
                q.AudioFile = question.AudioFile;
                q.ContentQuestion = question.ContentQuestion;
                q.ContentScript = question.ContentScript;
                q.NumPart = question.NumPart;
                q.QuizId = question.QuizId;

                await _context.SaveChangesAsync();
                return q;
            }
            return null;
        }
    }
}
