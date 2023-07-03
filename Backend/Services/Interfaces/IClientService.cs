using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public interface IClientService
{
    IEnumerable<Client> GetClients();
    Client GetClient(int id);
    Client GetMeAsClient(int userId);
    bool CreateClient(Client client);
    bool EditClient(Client client);
    bool DeleteClient(int id);
}