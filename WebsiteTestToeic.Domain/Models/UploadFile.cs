using Microsoft.AspNetCore.Http;

namespace WebsiteTestToeic.Domain.Models
{
    public class UploadFile
    {
        public IFormFile? File { get; set; }
    }
}
