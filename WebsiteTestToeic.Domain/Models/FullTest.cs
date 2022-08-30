using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebsiteTestToeic.Domain.Models
{
    public class FullTest
    {
        public int Id { get; set; }
        public int IdQuiz { get; set; }
        public int IdQuestion { get; set; }
        public int NumPart { get;set; }
    }
}
