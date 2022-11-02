using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebsiteTestToeic.Domain.Models
{
    public class User
    {
        public int? Id { get; set; }
        public string? UserName { get; set; }    
        public string? DateOfBirth { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public int? RoleId { get; set; }

        public virtual Role? Role { get; set; }
        public IList<Result>? ResultsList { get; set; }
        public IList<Quiz>? QuizzesList { get; set; }
    }
}
