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

    private IQueryable<Repair> GetQuery()
    {
        return dbContext.Set<Repair>().
            Include(r => r.Client).
            Include(r => r.Client.User).
            Include(r => r.Equipment).
            Include(r=>r.Parts);
    }

    public IEnumerable<Repair> GetRepairsForTable()
    {
        return dbContext.Set<Repair>().Select(r => new Repair
        {
            Id = r.Id,
            Status = r.Status,
            Client = new Client
            {
                FirstName = r.Client.FirstName,
                LastName = r.Client.LastName
            },
            Equipment = new Equipment
            {
                Name = r.Equipment.Name
            }
        }).ToList();
    }

    public IEnumerable<Message> GetMessages(int id)
    {
        return dbContext.Set<Repair>().Find(id).Messages;
    }
}