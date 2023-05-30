using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public interface IIdentityService
{
    User GetCurrentUser();
    User GetUser(int id);
}