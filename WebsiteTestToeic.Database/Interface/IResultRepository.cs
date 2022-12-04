using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Database.Interface
{
    public interface IResultRepository
    {
        public Task<List<Result>> GetAllResults();
        public Task<Result> GetResult(int id);
        public Task<int> AddResult(Result result);
    }
}
