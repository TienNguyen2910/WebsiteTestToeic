using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebsiteTestToeic.Domain.Models
{
    public class Test
    {
        public int? Id { get; set; }
        public TimeSpan ExamTime { get; set; }
        public string? TypeTest { get; set; }
        public int? NumQuestion { get; set; }
        public IList<Quiz>? QuizzesList { get; set; }   
    }
}
