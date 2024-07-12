using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace ControllerServer {
    [ApiController]
    [Route("api/[controller]")]
    public class TbBookController : ControllerBase {
        [HttpGet("[action]")]
        public IActionResult List() {
            try{
                using (NpgsqlConnection conn = new Connect().CreateConnection()) {
                    List<object> list = new List<object>();

                    NpgsqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "SELECT * FROM tb_book";

                    NpgsqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read()) {
                        list.Add(new {
                            id = Convert.ToInt32(reader["id"]),
                            name = reader["name"].ToString(),
                            price = Convert.ToInt32(reader["price"])
                        });
                    }

                    return Ok(list);
                }
            } catch(Exception ex) {
                return StatusCode(500, ex.Message);
            }
        }
    }
}