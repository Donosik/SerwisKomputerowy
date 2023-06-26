using System.ComponentModel.DataAnnotations;

namespace SerwisKomputerowy.Backend.Entities;

public enum Role
{
    User,
    Worker,
    Admin
}

public class User : IEntity
{
    [Key] public int Id { get; set; }
    public string Login { get; set; }
    public string Password { get; set; }
    public Role Role { get; set; }
    public List<Message>? Messages { get; set; }

    public User Update(User user)
    {
        this.Login = user.Login;
        this.Password = user.Password;
        this.Role = user.Role;
        return this;
    }
}