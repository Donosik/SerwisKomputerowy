using Action = SerwisKomputerowy.Backend.Entities.Action;

namespace SerwisKomputerowy.Backend.Services;

public interface IActionService
{
    IEnumerable<Action> GetActions();
    Action GetAction(int id);
    bool CreateAction(Action action);
    bool EditAction(Action action);
    bool DeleteAction(int id);
}