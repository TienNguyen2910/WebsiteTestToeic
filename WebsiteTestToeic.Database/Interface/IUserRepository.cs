
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Database.Interface
{
    public interface IUserRepository
    {
        public Task<User> AddUser(User user);
        public Task<bool> DeleteUser(int Id);
        public Task<bool> findUser(string email);
        public Task<User> UpdateUser(User user);
        public Task<User> GetUserById(int Id);
        public Task<UserRole> Login(string Email, string Password);
        public Task<List<User>> GetAllUsers();
    }
}
