using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public interface IPartRepository : IGenericRepository<Part>
{
    IEnumerable<Part> PartsSearchedByName(String name, bool isUsed);
    IEnumerable<Part> GetPartsFromRepair(int repairId);
}