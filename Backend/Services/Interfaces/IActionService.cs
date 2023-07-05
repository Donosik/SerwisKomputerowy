using Action = SerwisKomputerowy.Backend.Entities.Action;

namespace SerwisKomputerowy.Backend.Services;

public interface IActionService
{
    IEnumerable<Action> GetActions();
    Action GetAction(int id);
    IEnumerable<Action> GetActionsFromRepair(int repaidId);
    bool CreateAction(Action action);
    bool EditActionWithIds(int actionId, int repairId, int workerId);
    bool EditAction(Action action);
    bool DeleteAction(int id);
}