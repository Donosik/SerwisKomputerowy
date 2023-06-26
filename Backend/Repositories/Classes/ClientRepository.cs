using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public class ClientRepository : GenericRepository<Client>, IClientRepository
{
    public ClientRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }

    public override IQueryable<Client> GetQuery()
    {
        return dbContext.Set<Client>().
            Include(c => c.User).
            Include(c => c.Repairs);
    }
}