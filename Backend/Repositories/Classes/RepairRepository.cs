using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;
using Action = SerwisKomputerowy.Backend.Entities.Action;

namespace SerwisKomputerowy.Backend.Repositories;

public class RepairRepository : GenericRepository<Repair>, IRepairRepository
{
    public RepairRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }

    public Repair Get(int id)
    {
        return dbContext.Set<Repair>().Where(r=>r.Id==id).Include(r => r.Client).Include(r => r.Equipment).Include(r=>r.Actions).FirstOrDefault();
    }

    public IEnumerable<Repair> GetAll()
    {
        /*return dbContext.Set<Repair>().Select(r=>new Repair 
        { 
            Id=r.Id,
            Type=r.Type,
            IsGuarantee=r.IsGuarantee,
            GuaranteeTime=r.GuaranteeTime,
            AcceptanceTime=r.AcceptanceTime,
            ReturnTime=r.ReturnTime,
            Status=r.Status,
            Client=new Client
            {
                FirstName = r.Client.FirstName,
                LastName=r.Client.LastName,
            }
        }).ToList();*/
        return dbContext.Set<Repair>().Include(r => r.Client).Include(r => r.Equipment).ToList();
    }

    public IEnumerable<Repair> GetRepairsForTable()
    {
        return dbContext.Set<Repair>().Select(r => new Repair
        {
            Id=r.Id,
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