using Npgsql;

public class Connect
{
    private readonly string strConn = "Host=localhost;Port=5433;Database=db_dotnet_v1;Username=postgres;Password=123456";

    public NpgsqlConnection CreateConnection()
    {
        NpgsqlConnection conn = new NpgsqlConnection(strConn);
        conn.Open();

        return conn;
    }
}