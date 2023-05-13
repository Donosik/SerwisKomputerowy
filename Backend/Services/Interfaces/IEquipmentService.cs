using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public interface IEquipmentService
{
    IEnumerable<Equipment> GetEquipments();
    Equipment GetEquipment(int id);
    bool CreateEquipment(Equipment equipment);
    bool EditEquipment(Equipment equipment);
    bool DeleteEquipment(int id);
}