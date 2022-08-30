using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebsiteTestToeic.Domain.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string? Image { get; set; }
        public string? AudioFile { get; set; }
        public string? ContentQuestion { get; set; }
        public string? ContentScript { get; set; }
    }
}
