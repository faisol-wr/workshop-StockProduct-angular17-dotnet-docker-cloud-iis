using DotnetStockAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotnetStockAPI.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthenticateController : ControllerBase
{
    // สร้าง Object ของ ApplicationDbContext
    private readonly ApplicationDbContext _context;

    // ฟังก์ชันสร้าง Constructor สำหรับ initial ค่าของ ApplicationDbContext
    public AuthenticateController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("testconnectdb")]
    public void TestConnection()
    {
        if (_context.Database.CanConnect())
        {
            Response.WriteAsync("Connected");
        }
        else
        {
            Response.WriteAsync("Not Connected");
        }
    }
}