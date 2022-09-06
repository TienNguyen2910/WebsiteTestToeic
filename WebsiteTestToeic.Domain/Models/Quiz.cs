using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebsiteTestToeic.Domain.Models
{
    public class Quiz
    {
        public Quiz()
        {
            QuestionsList = new List<Question>();
            ResultsLists = new List<Result>();
        }
        public int Id { get; set; }
        public string? Title { get; set; }
        public int? TestId { get; set; }
        public int? ActorId { get; set;}
        public virtual User User { get; set; }
        public virtual Test Test { get; set; }
        [JsonIgnore]
        public virtual ICollection<Question> QuestionsList { get; set; }
        [JsonIgnore]
        public virtual ICollection<Result> ResultsLists { get; set; }
        
    }
}
