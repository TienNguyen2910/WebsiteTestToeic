

using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Database.Interface
{
    public interface IResultDetailRepository
    {
        public Task<List<ResultDetail>> GetAllResultDetails();
        public Task<bool> AddResultDetail(ResultDetail resultDetail);
        public Task<List<ResultDetail>> GetResultDetail(int ResultId);
    }
}
