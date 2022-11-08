using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Database.Interface
{
    public interface IQuestionRepository
    {
        public Task<List<Question>> GetAllQuestions(int QuizId);
        public Task<Question> GetQuestionById(int Id);
        public Task<bool> AddQuestion(Question question);
        public Task<Question> UpdateQuestion(Question question);
        public Task<bool> DeleteQuestion(int Id);
    }
}
