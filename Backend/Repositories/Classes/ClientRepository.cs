using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public class ClientRepository : GenericRepository<Client>, IClientRepository
{
    public ClientRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<Client> GetAll()
    {
        return dbContext.Set<Client>().Select(c => new Client
        {
            Id=c.Id,
            FirstName = c.FirstName,
            LastName = c.LastName,
            User=new User
            {
                Login = c.User.Login,
                Password = c.User.Password,
                Role=c.User.Role
            }
        }).ToList();
    }

    public Client Get(int id)
    {
        return dbContext.Set<Client>().Where(c=>c.Id==id).Select(c => new Client
        {
            Id=c.Id,
            FirstName = c.FirstName,
            LastName = c.LastName,
            User=new User
            {
                Login = c.User.Login,
                Password = c.User.Password,
                Role=c.User.Role
            }
        }).First();
    }
}