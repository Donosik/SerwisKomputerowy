using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public class WorkerRepository : GenericRepository<Worker>, IWorkerRepository
{
    public WorkerRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }

    public override IQueryable<Worker> GetQuery()
    {
        return dbContext.Set<Worker>().Include(w => w.User).Include(w => w.Actions);
    }
}