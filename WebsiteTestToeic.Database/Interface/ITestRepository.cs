using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Database.Interface
{
    public interface ITestRepository
    {
        public  Task<Test> AddTest(Test test);
        public  Task<Test> GetTest(int id);
        public  Task<bool> DeleteTest(int id);
        public  Task<Test> UpdateTest(Test test);
        public  Task<List<Test>> GetAllTests();
    }
}
