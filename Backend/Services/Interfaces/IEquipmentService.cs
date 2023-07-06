using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public interface IEquipmentService
{
    IEnumerable<Equipment> GetEquipments();
    Equipment GetEquipment(int id);
    bool CreateEquipment(Equipment equipment);
    bool EditEquipment(Equipment equipment);
    bool EditRepairToEquipment(int eqId, int repairId);
    bool DeleteEquipment(int id);
}