
namespace WebsiteTestToeic.Domain.Models
{
    public class Question
    {
        public int? Id { get; set; }
        public string? Image { get; set; }
        public string? AudioFile { get; set; }
        public string? ContentQuestion { get; set; }
        public string? ContentScript { get; set; }
        public int? NumPart { get; set; }
        public int? QuizId { get; set; }
        public string? AnswerDetail { get; set; }
        public virtual Quiz? Quiz { get; set; }
        public IList<Answer>? Answers { get; set; }
        public IList<ResultDetail>? ResultDetailsList { get; set; }
    }
}
