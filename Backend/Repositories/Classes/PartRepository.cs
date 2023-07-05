using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public class PartRepository : GenericRepository<Part>, IPartRepository
{
    public PartRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }

    public IQueryable<Part> GetQuery()
    {
        return dbContext.Set<Part>().Include(p => p.Repair);
    }

    public IEnumerable<Part> PartsSearchedByName(String name, bool isUsed)
    {
        return dbContext.Set<Part>().Where(p => p.IsUsed == isUsed).Where(p=>p.PartName.Contains(name)).ToList();
    }
}