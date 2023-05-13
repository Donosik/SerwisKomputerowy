using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public class UserRepository : GenericRepository<User>,IUserRepository
{
    public UserRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }
}