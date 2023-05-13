using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public class PartRepository : GenericRepository<Part>, IPartRepository
{
    public PartRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }
}