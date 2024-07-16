using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ControllerServer
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SecureController : ControllerBase
    {
        [HttpGet("[action]")]
        public IActionResult Data()
        {
            return Ok(new { message = "This is secure data" });
        }
    }
}