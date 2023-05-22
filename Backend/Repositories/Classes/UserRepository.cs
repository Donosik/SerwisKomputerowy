using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public class UserRepository : GenericRepository<User>,IUserRepository
{
    public UserRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<Message> GetMessages(int id)
    {
        return dbContext.Set<User>().Find(id).Messages;
    }
}