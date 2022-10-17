using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace WebsiteTestToeic.Domain.Models
{
    public class Role
    {
        public int Id { get; set; }
        public string? RoleName { get; set; }
        public IList<User>? Users { get; set; }
    }
}
