using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public interface IUserService
{
    IEnumerable<User> GetUsers();
    User GetUser(int id);
    IEnumerable<Message> GetMessagesOfUser(int id);
    bool CreateUser(User user);
    bool EditUser(User user);
    bool DeleteUser(int id);
}