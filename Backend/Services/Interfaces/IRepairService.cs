using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public interface IRepairService
{
    IEnumerable<Repair> GetRepairs();
    Repair GetRepair(int id);
    IEnumerable<Message> GetMessagesOfRepair(int id);
    bool CreateRepair(Repair repair);
    bool EditRepair(Repair repair);
    bool DeleteRepair(int id);
}