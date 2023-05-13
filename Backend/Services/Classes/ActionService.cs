using SerwisKomputerowy.Backend.Repositories;
using Action = SerwisKomputerowy.Backend.Entities.Action;

namespace SerwisKomputerowy.Backend.Services;

public class ActionService : IActionService
{
    public IUnitOfWork unitOfWork;

    public ActionService(IUnitOfWork unitOfWork)
    {
        this.unitOfWork = unitOfWork;
    }

    public IEnumerable<Action> GetActions()
    {
        IEnumerable<Action> actions = unitOfWork.actions.GetAll();
        return actions;
    }

    public Action GetAction(int id)
    {
        if (id > 0)
        {
            Action action = unitOfWork.actions.Get(id);
            if (action != null)
                return action;
        }

        return null;
    }

    public bool CreateAction(Action action)
    {
        if (action != null)
        {
            unitOfWork.actions.Create(action);
            int result = unitOfWork.Save();
            if (result > 0)
                return true;
        }

        return false;
    }

    public bool EditAction(Action action)
    {
        if (action != null)
        {
            Action oldAction = unitOfWork.actions.Get(action.Id);
            if (oldAction != null)
            {
                oldAction.Description = action.Description;
                oldAction.Repair = action.Repair;
                oldAction.Worker = action.Worker;
                unitOfWork.actions.Update(oldAction);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }

    public bool DeleteAction(int id)
    {
        if (id > 0)
        {
            Action action = unitOfWork.actions.Get(id);
            if (action != null)
            {
                unitOfWork.actions.Delete(action);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }
}