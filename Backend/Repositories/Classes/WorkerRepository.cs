using System.Collections;
using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;
using Action = SerwisKomputerowy.Backend.Entities.Action;

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
    
    public IEnumerable<Worker> GetWorkersFromRepair(int repairId)
        {
             IEnumerable<Action> actions = dbContext.Set<Action>().Include(a => a.Worker).Where(a => a.Repair.Id == repairId).ToList();
             List<Worker> workersList=new List<Worker>();
             foreach (var action in actions)
             {
                 workersList.Add(action.Worker);
             }

             IEnumerable<Worker> workers = workersList;
             return workers;
        }
}