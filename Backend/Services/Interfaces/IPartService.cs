using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public interface IPartService
{
    IEnumerable<Part> GetParts();
    Part GetPart(int id);
    IEnumerable<Part> PartsSearchedByName(String name, bool isUsed);
    bool CreatePart(Part part);
    bool EditPart(Part part);
    bool DeletePart(int id);
}