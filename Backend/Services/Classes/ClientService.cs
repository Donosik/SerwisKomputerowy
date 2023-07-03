using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Repositories;

namespace SerwisKomputerowy.Backend.Services;

public class ClientService : IClientService
{
    public IUnitOfWork unitOfWork;

    public ClientService(IUnitOfWork unitOfWork)
    {
        this.unitOfWork = unitOfWork;
    }

    public IEnumerable<Client> GetClients()
    {
        IEnumerable<Client> clients = unitOfWork.clients.GetAll();
        return clients;
    }

    public Client GetClient(int id)
    {
        if (id > 0)
        {
            Client client = unitOfWork.clients.Get(id);
            if (client != null)
                return client;
        }

        return null;
    }

    public Client GetMeAsClient(int userId)
    {
        foreach (var client in GetClients())
        {
            if (client.User.Id == userId)
            {
                return client;
            }
        }

        return null;
    }

    public bool CreateClient(Client client)
    {
        if (client != null)
        {
            unitOfWork.clients.Create(client);
            int result = unitOfWork.Save();
            if (result > 0)
                return true;
        }

        return false;
    }

    public bool EditClient(Client client)
    {
        if (client != null)
        {
            Client oldClient = unitOfWork.clients.Get(client.Id);
            if (oldClient != null)
            {
                oldClient.Update(client);
                unitOfWork.clients.Update(oldClient);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }

    public bool DeleteClient(int id)
    {
        if (id > 0)
        {
            Client client = unitOfWork.clients.Get(id);
            if (client != null)
            {
                unitOfWork.clients.Delete(client);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }
}