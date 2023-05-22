using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public interface IRepairRepository : IGenericRepository<Repair>
{
    IEnumerable<Message> GetMessages(int id);
}