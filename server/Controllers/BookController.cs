using Microsoft.AspNetCore.Mvc;

namespace ControllerServer
{
    [ApiController]
    // eq /api/book
    [Route("/api/[controller]")]
    public class BookController : ControllerBase
    {
        [HttpGet]
        // Set name
        [Route("[action]")]
        public IActionResult index()
        {
            return Ok(new { message = "index" });
        }

        [HttpGet]
        [Route("[action]/{name}")]
        public IActionResult Info(string name)
        {
            return Ok(new { message = "info", name });
        }

        [HttpGet]
        [Route("MultiParam/{name}/{age}")]
        public IActionResult MutiParam(string name, int age) 
        {
            return Ok(new { message = "MultiParam", name = name, age = age});
        }


    }
}