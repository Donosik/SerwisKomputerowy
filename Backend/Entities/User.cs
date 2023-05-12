using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SerwisKomputerowy.Backend.Entities;

public enum Role
{
    User,
    Worker,
    Admin
}

public class User
{
    [Key] public int Id { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    public Role Role { get; set; }
    public List<Message> Messages { get; set; }
}