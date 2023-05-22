using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public class RepairRepository : GenericRepository<Repair>, IRepairRepository
{
    public RepairRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }

    public IEnumerable<Message> GetMessages(int id)
    {
        return dbContext.Set<Repair>().Find(id).Messages;
    }
}