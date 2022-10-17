using WebsiteTestToeic.Domain.Models;
using System.Threading.Tasks;

namespace WebsiteTestToeic.Database.Interface
{
    public interface IAnswerRepository
    {
        public Task<List<Answer>> GetAllAnswer(int Questionid);
        public Task<Answer> GetAnswer(int Id);
        public Task<Answer> AddAnswer(Answer answer);
        public Task<Answer> UpdateAnswer(Answer answer);
        public Task<bool> DeleteAnswer(int Id);
    }
}
