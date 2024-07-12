using Microsoft.AspNetCore.Mvc;
using Npgsql;

namespace ControllerServer
{
    [ApiController]
    [Route("api/[controller]")]
    public class TbBookController : ControllerBase
    {
        [HttpGet("[action]")]
        public IActionResult List()
        {
            try
            {
                using (NpgsqlConnection conn = new Connect().CreateConnection())
                {
                    List<object> list = new List<object>();

                    NpgsqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "SELECT * FROM tb_book";

                    NpgsqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        list.Add(new
                        {
                            id = Convert.ToInt32(reader["id"]),
                            name = reader["name"].ToString(),
                            price = Convert.ToInt32(reader["price"])
                        });
                    }

                    return Ok(list);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("[action]")]
        public IActionResult Create(TbBookModel model)
        {
            try
            {
                using (NpgsqlConnection conn = new Connect().CreateConnection())
                {
                    NpgsqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "INSERT INTO tb_book(name, price) VALUES(@name, @price)";
                    cmd.Parameters.AddWithValue("name", model.name!);
                    cmd.Parameters.AddWithValue("price", model.price);
                    cmd.ExecuteNonQuery();

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPut("[action]")]
        public IActionResult Update(TbBookModel model)
        {
            try
            {
                using (NpgsqlConnection conn = new Connect().CreateConnection())
                {
                    NpgsqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "UPDATE tb_book SET name = @name, price = @price WHERE id = @id";
                    cmd.Parameters.AddWithValue("name", model.name!);
                    cmd.Parameters.AddWithValue("price", model.price);
                    cmd.Parameters.AddWithValue("id", model.id);
                    cmd.ExecuteNonQuery();

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete("[action]/{id}")]
        public IActionResult Delete(int id) {
             try
            {
                using (NpgsqlConnection conn = new Connect().CreateConnection())
                {
                    NpgsqlCommand cmd = conn.CreateCommand();
                    cmd.CommandText = "DELETE FROM tb_book WHERE id = @id";
                    cmd.Parameters.AddWithValue("id", id);
                    cmd.ExecuteNonQuery();

                    return Ok();
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}