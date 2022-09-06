using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebsiteTestToeic.Domain.Models
{
    public class Question
    {
        public Question()
        {
            Answers = new List<Answer>();
            ResultDetailsList = new List<ResultDetail>();
        }
        public int Id { get; set; }
        public string? Image { get; set; }
        public string? AudioFile { get; set; }
        public string? ContentQuestion { get; set; }
        public string? ContentScript { get; set; }
        public int NumPart { get; set; }
        public int? QuizId { get; set; }
        public virtual Quiz Quiz { get; set; }
        [JsonIgnore]
        public virtual ICollection<Answer> Answers { get; set; }
        [JsonIgnore]
        public virtual ICollection<ResultDetail> ResultDetailsList { get; set; }
    }
}
