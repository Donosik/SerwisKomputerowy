using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using Action = SerwisKomputerowy.Backend.Entities.Action;

namespace SerwisKomputerowy.Backend.Repositories;

public class ActionRepository : GenericRepository<Action>, IActionRepository
{
    public ActionRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }

    public override IQueryable<Action> GetQuery()
    {
        return dbContext.Set<Action>().
            Include(a => a.Repair).
            Include(a => a.Worker);
    }
}