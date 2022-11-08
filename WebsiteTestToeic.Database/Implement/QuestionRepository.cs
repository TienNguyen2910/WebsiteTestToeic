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
        public async Task<bool> AddQuestion(Question question)
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
            if (q != null)
            {
                await _context.Questions.AddAsync(q);
                await _context.SaveChangesAsync();
                foreach (var answer in question.Answers)
                {
                    Answer a = new Answer();

                    a.QuestionId = q.Id;
                    a.ContentAnswer = answer.ContentAnswer;
                    a.IsAnswer = answer.IsAnswer;

                    await _context.Answers.AddAsync(a);
                    await _context.SaveChangesAsync();
                }
                
                return true;
            }
            return false;
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
            List<Question> questionList =  _context.Questions.Include(answer => answer.Answers).Where(q => q.QuizId == QuizId).ToList();
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
