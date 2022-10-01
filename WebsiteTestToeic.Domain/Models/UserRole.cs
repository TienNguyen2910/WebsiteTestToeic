using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebsiteTestToeic.Domain.Models
{
    public class UserRole
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string DateOfBirth { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public int? RoleId { get; set; }
        public string? RoleName { get; set; }
    }
}
