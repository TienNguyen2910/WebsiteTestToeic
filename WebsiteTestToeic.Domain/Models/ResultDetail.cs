using System.ComponentModel.DataAnnotations.Schema;

namespace WebsiteTestToeic.Domain.Models
{
    public class ResultDetail
    {
        public int Id { get; set; }
        public int? QuestionId { get; set; }
        public int? ResultId { get; set; }
        public int? AnswerSelectedId { get; set; }
        public bool IsAnswerTrue { get; set; }
        public virtual Result? Result { get; set; }
        public virtual Question? Question { get; set; }
        public virtual Answer? Answer { get; set; }

    }
}
