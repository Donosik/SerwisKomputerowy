using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public class RegisterUser
{
    public string login;
    public string password;
}

public class LoginUser
{
    public string login;
    public string password;
}

public interface IUserService
{
    bool Register(RegisterUser registerUser);
    User Login(LoginUser loginUser);
    string GenerateJwtToken(User user);
    public User GetCurrentUser();
    IEnumerable<User> GetUsers();
    User GetUser(int id);
    IEnumerable<Message> GetMessagesOfUser(int id);
    bool CreateUser(User user);
    bool EditUser(User user);
    bool DeleteUser(int id);
}