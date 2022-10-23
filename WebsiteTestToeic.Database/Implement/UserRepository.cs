﻿using Microsoft.EntityFrameworkCore;
using WebsiteTestToeic.Database.DatabaseContext;
using WebsiteTestToeic.Database.DbContextFactory;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Database.Implement
{
    public class UserRepository : IUserRepository
    {
        private readonly TestToeicDbContext _context;
        public UserRepository(TestToeicDbContext context)
        {
            if (context == null)
                _context = TestToeicDbContextFactory.GetDbContext();
            _context = context;
        }
        public async Task<User> AddUser(User user)
        {
            User u = new User()
            {
                UserName = user.UserName,
                DateOfBirth = user.DateOfBirth,
                Email = user.Email,
                Password = user.Password,
                RoleId = user.RoleId
            };
            await _context.Users.AddAsync(u);
            await _context.SaveChangesAsync();
            return u;
        }

        public async Task<bool> DeleteUser(int Id)
        {
            bool result = false;
            User u = await _context.Users.FirstOrDefaultAsync(u => u.Id == Id);
            if (u != null)
            {
                 _context.Users.Remove(u);
                await _context.SaveChangesAsync();
                result = true;
            }
            return result;
        }

        public async Task<bool> findUser(string email)
        {
            bool result = false;
            User u = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);
            if (u != null)
                result = true;
            return result;
        }

        public async Task<List<User>> GetAllUsers()
        {
            return await _context.Users.Include(u => u.ResultsList).Where(u => u.Role.RoleName != "Admin").ToListAsync();
        }

        public async Task<UserRole> Login(string Email, string Password)
        {
            //User u = await _context.Users.Where(u => (u.Email == Email) && (u.Password == Password)).FirstOrDefaultAsync();
            UserRole user = (from u in _context.Users
                         join r in _context.Roles on u.RoleId equals r.Id        
                         where u.Email == Email && (u.Password == Password)
                         select new UserRole
                         {
                              Id = u.Id,
                              UserName = u.UserName,
                              DateOfBirth = u.DateOfBirth,
                              Email = u.Email,
                              Password = u.Password,
                              RoleId = u.RoleId,
                              RoleName = r.RoleName
                          }).FirstOrDefault();
            if (user != null)
                return user;
            return null;
        }

        public async Task<User> UpdateUser(User user)
        {
            User u = new User()
            {
                UserName = user.UserName,
                DateOfBirth = user.DateOfBirth,
                Email = user.Email,
                Password = user.Password,
                RoleId = user.RoleId
            };
            return u;
        }
    }
}
