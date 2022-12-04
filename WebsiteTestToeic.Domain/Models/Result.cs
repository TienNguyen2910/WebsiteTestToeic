using System.Text.Json.Serialization;

namespace WebsiteTestToeic.Domain.Models
{
    public class Result 
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public int? QuizId { get; set; }
        public DateTime? StartedAt { get; set; }
        public DateTime? EndedAt { get; set; }
        public int? Score { get; set; }
        public virtual User? User { get; set; }
        public virtual Quiz? Quiz { get; set; }
        public IList<ResultDetail>? ResultDetailsList { get; set; }
    }
}
