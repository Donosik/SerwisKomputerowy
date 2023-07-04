using System.Collections;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public interface IWorkerService
{
    IEnumerable<Worker> GetWorkers();
    Worker GetWorker(int id);
    Worker GetMeAsWorker(int userId);
    IEnumerable<Worker> GetWorkersFromRepair(int repairId);
    bool CreateWorker(Worker worker);
    bool EditWorker(Worker worker);
    bool EditSpecialization(int id, int newSpecialization);
    bool EditWorkerToAdmin(int id, bool isAdmin);
    bool DeleteWorker(int id);
}