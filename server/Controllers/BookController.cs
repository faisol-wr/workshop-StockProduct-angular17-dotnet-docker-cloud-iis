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

        [HttpGet("GetValue")]
        public IActionResult GetValue()
        {
            return Ok("Hello World");
        }

        [HttpGet("Query1")]
        public IActionResult Query1()
        {
            var value = HttpContext.Request.Query["value"].ToString();
            var age = HttpContext.Request.Query["age"].ToString();
            return Ok(new { value, age });
        }

        [HttpGet("Query2")]
        public IActionResult Query2([FromQuery] string value)
        {
            return Ok(value);
        }
    }
}