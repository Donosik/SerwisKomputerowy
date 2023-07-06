using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;
using Action = SerwisKomputerowy.Backend.Entities.Action;

namespace SerwisKomputerowy.Backend.Repositories;

public class RepairRepository : GenericRepository<Repair>, IRepairRepository
{
    public RepairRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }

    public override IQueryable<Repair> GetQuery()
    {
        return dbContext.Set<Repair>().
            Include(r => r.Client).
            Include(r=>r.Messages).
            Include(r => r.Parts).
            Include(r => r.Equipment).
            Include(r=>r.Actions);
    }

    public IQueryable<Repair> GetRepairsForTable()
    {
        return dbContext.Set<Repair>().Select(r => new Repair
        {
            Id = r.Id,
            Status = r.Status,
            Client = new Client
            {
                Id=r.Client.Id,
                FirstName = r.Client.FirstName,
                LastName = r.Client.LastName,
                User=r.Client.User
            },
            Equipment = new Equipment
            {
                Name = r.Equipment.Name
            }
        });
    }

    public IEnumerable<Repair> GetAllRepairsForTable(bool all)
    {
        if(all)
            return GetRepairsForTable().ToList();
        else 
            return GetRepairsForTable().Where(r=>r.Status==Status.Przyjete).ToList();
    }

    public IEnumerable<Message> GetMessages(int id)
    {
        return dbContext.Set<Repair>().Find(id).Messages;
    }

    public IEnumerable<Repair> GetRepairsOfClient(int clientId)
    {
        return GetRepairsForTable().Where(r => r.Client.User.Id == clientId).ToList();
    }
}