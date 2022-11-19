using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using WebsiteTestToeic.Database.Interface;
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Api.Controller
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        public UserController(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }

        [HttpPost("checkDuplicateEmail")]
        public async Task<ActionResult<string>> CheckDuplicateEmail(string email)
        {
            return Ok( await _userRepository.findUser(email));
        }

        [HttpPost("Register")]
        public async Task<ActionResult<User>> Register(User user)
        {
            CreatePasswordHash(user.Password, out byte[] passwordHash);
            user.Password = Convert.ToBase64String(passwordHash);
            return Ok(await _userRepository.AddUser(user));
        }

        [HttpPost("Login")]
        public async Task<ActionResult<string>> Login(string email, string password)
        {
            CreatePasswordHash(password, out byte[] passwordHash);
            password = Convert.ToBase64String(passwordHash);
            var user = await _userRepository.Login(email, password);
            if(user != null)
            {
                var token = CreateToken(user);
                return Ok(token);
            }
            return null;
        }
        [HttpGet("GetAllUsers")]
        public async Task<ActionResult<List<User>>> GetAllUsers()
        {
            return Ok(await _userRepository.GetAllUsers());
        }
        [HttpGet("GetUserById")]
        public async Task<ActionResult<User>> GetUserById(int Id)
        {
            return Ok(await _userRepository.GetUserById(Id));
        }
        [HttpPut("UpdateUser")]
        public async Task<ActionResult<User>> UpdateUser(User user)
        {
            return Ok(await _userRepository.UpdateUser(user));
        }
        [HttpPost("ResetPassword"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<bool>> ResetPassword(int id, string oldPass, string newPass)
        {
            CreatePasswordHash(oldPass, out byte[] oldPasswordHash);
            CreatePasswordHash(newPass, out byte[] newPasswordHash);
            oldPass = Convert.ToBase64String(oldPasswordHash);
            newPass = Convert.ToBase64String(newPasswordHash);
            return Ok(await _userRepository.ResetPassword(id, oldPass, newPass));
        }
        [HttpDelete("DeleteUser")]
        public async Task<ActionResult<bool>> DeleteUser(int Id)
        {
            var user = await _userRepository.GetUserById(Id);
            bool result = true;
            if (user != null)
                result = await _userRepository.DeleteUser(Id);
            return Ok(result);
        }
        private string CreateToken(UserRole user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.DateOfBirth,user.DateOfBirth),
                new Claim(ClaimTypes.Role, user.RoleName)
            };
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_configuration.GetSection("Appsettings:Token").Value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var token = new JwtSecurityToken
                (
                    claims: claims,
                    expires: DateTime.Now.AddDays(7),
                    signingCredentials: cred
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
        private void CreatePasswordHash(string password, out byte[] passwordHash)
        {
            using (var sha512 = SHA512.Create())
            {
                passwordHash = sha512.ComputeHash(Encoding.ASCII.GetBytes(password));
            }
        }
    }
}
