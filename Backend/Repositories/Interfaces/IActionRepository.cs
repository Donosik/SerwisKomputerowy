using System.Collections;
using SerwisKomputerowy.Backend.Entities;
using Action = SerwisKomputerowy.Backend.Entities.Action;

namespace SerwisKomputerowy.Backend.Repositories;

public interface IActionRepository : IGenericRepository<Action>
{
    IEnumerable<Action> GetActionsFromRepair(int repaidId);
}