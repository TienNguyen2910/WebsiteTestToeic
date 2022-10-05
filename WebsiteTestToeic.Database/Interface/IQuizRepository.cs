using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebsiteTestToeic.Domain.Models;

namespace WebsiteTestToeic.Database.Interface
{
    public interface IQuizRepository
    {
        public Task<List<Quiz>> GetAllQuizs();
        public Task<Quiz> GetQuiz(int id);
        public Task<Quiz> AddQuiz(string title, int testid, int actorid);
        public Task<Quiz> UpdateQuiz(Quiz quiz);
        public Task<bool> DeleteQuiz(int id);
    }
}
