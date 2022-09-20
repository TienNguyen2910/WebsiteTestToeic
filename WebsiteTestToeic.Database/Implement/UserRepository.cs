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

        public async Task<List<User>> GetAllUser()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> Login(string Email, string Password)
        {
            User u = await _context.Users.Where(u => (u.Email == Email) && (u.Password == Password)).FirstOrDefaultAsync();
            if (u != null)
                return u;
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
