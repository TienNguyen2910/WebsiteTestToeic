using System.Text.Json.Serialization;

namespace WebsiteTestToeic.Domain.Models
{
    public class Answer
    {
        public int? Id { get; set; }
        public int? QuestionId { get; set; }
        public string? ContentAnswer { get; set; }
        public bool? IsAnswer { get; set; }
        public Question? Question { get; set; }
        public IList<ResultDetail>? ResultDetailsList { get; set; }
    }
}
