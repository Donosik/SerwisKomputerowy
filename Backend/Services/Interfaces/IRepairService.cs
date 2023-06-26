using System.Collections;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public interface IRepairService
{
    IEnumerable<Repair> GetRepairs();
    Repair GetRepair(int id);
    bool CreateRepair(Repair repair);
    bool EditRepair(Repair repair);
    bool EditClientId(int idrepair,int idclient);
    bool DeleteRepair(int id);
    IEnumerable<Repair> GetRepairsForTable();
    IEnumerable<Message> GetMessagesOfRepair(int id);
}