using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public interface IRepairRepository : IGenericRepository<Repair>
{
    IQueryable<Repair> GetRepairsForTable();
    IEnumerable<Repair> GetAllRepairsForTable();
    IEnumerable<Message> GetMessages(int id);
    IEnumerable<Repair> GetRepairsOfClient(int clientId);
}