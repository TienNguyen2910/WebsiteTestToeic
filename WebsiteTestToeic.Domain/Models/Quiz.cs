using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace WebsiteTestToeic.Domain.Models
{
    public class Quiz
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public int? TestId { get; set; }
        public int? ActorId { get; set;}
        public virtual User User { get; set; }
        public virtual Test Test { get; set; }
        public IList<Question>? QuestionsList { get; set; }
        public IList<Result> ResultsLists { get; set; }
        
    }
}
