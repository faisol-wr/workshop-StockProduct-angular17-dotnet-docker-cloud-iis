using Microsoft.AspNetCore.Mvc;

namespace ControllerServer
{
    [ApiController]
    [Route("[controller]")]
    public class FileUploadController : ControllerBase
    {
        private readonly string _uploadsDir;

        public FileUploadController()
        {
            _uploadsDir = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

            if (!Directory.Exists(_uploadsDir))
            {
                Directory.CreateDirectory(_uploadsDir);
            }
        }

        [HttpPost]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No File uploaded.");
            }

            var filePath = Path.Combine(_uploadsDir, file.FileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return Ok(new { file.FileName, file.Length });
        }
    }
}