
using WebsiteTestToeic.Database.DatabaseContext;

namespace WebsiteTestToeic.Database.DbContextFactory
{
    public class TestToeicDbContextFactory
    {
        private static TestToeicDbContext _testToeicDbContext = null;
        public static TestToeicDbContext GetDbContext()
        {
            if(_testToeicDbContext == null)
                _testToeicDbContext = new TestToeicDbContext();
            return _testToeicDbContext;
        }
    }
}
