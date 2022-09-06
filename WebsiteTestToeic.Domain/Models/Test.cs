using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebsiteTestToeic.Domain.Models
{
    public class Test
    {
        public Test()
        {
            QuizzesList = new List<Quiz>();
        }
        public int Id { get; set; }
        public DateTime ExamTime { get; set; }
        public string TypeTest { get; set; }
        public int NumQuestion { get; set; }
        [JsonIgnore]
        public ICollection<Quiz> QuizzesList { get; set; }   
    }
}
