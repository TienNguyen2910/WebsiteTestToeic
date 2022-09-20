
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Database.Interface
{
    public interface IUserRepository
    {
        public Task<User> AddUser(User user);
        public Task<bool> DeleteUser(int Id);
        public Task<User> UpdateUser(User user);
        public Task<User> Login(string Email, string Password);
        public Task<List<User>> GetAllUser();
    }
}
