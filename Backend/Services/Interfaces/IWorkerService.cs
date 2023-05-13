using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public interface IWorkerService
{
    IEnumerable<Worker> GetWorkers();
    Worker GetWorker(int id);
    bool CreateWorker(Worker worker);
    bool EditWorker(Worker worker);
    bool DeleteWorker(int id);
}