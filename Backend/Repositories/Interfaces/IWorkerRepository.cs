using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public interface IWorkerRepository : IGenericRepository<Worker>
{
    IEnumerable<Worker> GetWorkersFromRepair(int repairId);
}