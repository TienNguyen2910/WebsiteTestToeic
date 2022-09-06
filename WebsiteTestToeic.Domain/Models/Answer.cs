using System.Text.Json.Serialization;

namespace WebsiteTestToeic.Domain.Models
{
    public class Answer
    {
        public Answer()
        {
            ResultDetailsList = new List<ResultDetail>();
        }
        public int Id { get; set; }
        public int? QuestionId { get; set; }
        public string ContentAnswer { get; set; }
        public bool IsAnswer { get; set; }

        public virtual Question Question { get; set; }
        [JsonIgnore]
        public virtual ICollection<ResultDetail> ResultDetailsList { get; set; }
    }
}
