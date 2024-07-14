using DotnetStockAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace DotnetStockAPI.Controllers;

// Multiple Roles
// [Authorize(Roles = UserRolesModel.Admin + "," + UserRolesModel.Manager)]
// [Authorize]
[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    // สร้าง Object ของ ApplicationDbContext
    private readonly ApplicationDbContext _context;

    public ProductController(ApplicationDbContext context)
    {
        _context = context;
    }

    // CRUD Product
    // ฟังก์ชันสำหรับการดึงข้อมูล Product ทั้งหมด
    // GET /api/Product
    [HttpGet]
    public ActionResult<product> GetProducts()
    {
        // LINQ stand for "Language Integrated Query"
        var products = _context.products.ToList();

        // ส่งข้อมูลกลับไปให้ Client เป็น JSON
        return Ok(products);
    }

    // ฟังก์ชันสำหรับการดึงข้อมูล Product ตาม ID
    // GET /api/Product/1
    [HttpGet("{id}")]
    public ActionResult<product> GetProducts(int id)
    {
        // LINQ สำหรับการดึงข้อมูลจากตาราง Products ตาม ID
        var product = _context.products.Find(id);

        // ถ้าไม่พบข้อมูล
        if (product == null)
        {
            return NotFound();
        }

        // ส่งข้อมูลกลับไปให้ Client เป็น JSON
        return Ok(product);
    }

    // ฟังก์ชันสำหรับการเพิ่มข้อมูล Product
    // POST /api/Product
    [HttpPost]
    public ActionResult<product> CreateProduct([FromBody] product product)
    {
        // เพิ่มข้อมูลลงในตาราง Products
        _context.products.Add(product); // insert into product values (...)
        _context.SaveChanges(); // commit

        // ส่งข้อมูลกลับไปให้ Client เป็น JSON
        return Ok(product);
    }

    // ฟังก์ชันสำหรัลการแก้ไขข้อมูลสินค้า
    // PUT /api/Product/1
    [HttpPut]
    public ActionResult<product> UpdateProduct(int id, [FromBody] product product)
    {
        // ค้นหาข้อมูล Product ตาม ID
        var productData = _context.products.Find(id); // select * from product where id = 1

        // ถ้าไม่พบข้อมูลให้ return NotFound
        if (productData == null)
        {
            return NotFound();
        }

        // แก้ไขข้อมูล product
        productData.productname = product.productname;
        productData.unitprice = product.unitprice;
        productData.unitinstock = product.unitinstock;
        productData.productpicture = product.productpicture;
        productData.categoryid = product.categoryid;
        productData.modifieddate = product.modifieddate;

        // commit
        _context.SaveChanges();

        // สั่งข้อมูลกลับไปให้ Client เป็น JSON
        return Ok(productData);
    }

    // ฟังก์ชันสำหรัลการลบข้อมูล Product
    // DELETE /api/Product/1
    [HttpDelete("{id}")]
    public ActionResult<product> DeleteProduct(int id)
    {
        // ค้นหาข้อมูล Product ตาม ID
        var product = _context.products.Find(id); // select *from Product where id = 1

        // ถ้าไม่พบข้อมูลให้ return NotFound
        if (product == null)
        {
            return NotFound();
        }

        // ลบข้อมูล Product
        _context.products.Remove(product); // delete from Product where id = 1
        _context.SaveChanges(); // commit

        // ส่งข้อมูลกลับไปให้ Client เป็น JSON
        return Ok(product);
    }
}