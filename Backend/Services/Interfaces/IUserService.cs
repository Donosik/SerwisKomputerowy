using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public class RegisterUser
{
    public required string Login { get; set; }
    public required string Password { get; set; }
}

public class LoginUser
{
    public required string Login { get; set; }
    public required string Password { get; set; }
}

public interface IUserService
{
    bool Register(RegisterUser registerUser);
    User Login(LoginUser loginUser);
    string GenerateJwtToken(User user);
    IEnumerable<User> GetUsers();
    User GetUser(int id);
    IEnumerable<Message> GetMessagesOfUser(int id);
    bool CreateUser(User user);
    bool EditUser(User user);
    bool DeleteUser(int id);
}