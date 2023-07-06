using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public interface IPartService
{
    IEnumerable<Part> GetParts();
    Part GetPart(int id);
    IEnumerable<Part> PartsSearchedByName(String name, bool isUsed);
    IEnumerable<Part> GetPartsFromRepair(int repairId);
    bool CreatePart(Part part);
    bool EditPart(Part part);
    bool EditPartToRepair(int partSN, int repairId);
    bool DeletePart(int id);
}