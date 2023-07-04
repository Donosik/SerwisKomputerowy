using System.Collections;
using SerwisKomputerowy.Backend.Entities;
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

    public bool EditActionWithIds(int actionId, int repairId, int workerId)
    {
        Action action = unitOfWork.actions.Get(actionId);
        if (action != null)
        {
            Repair repair = unitOfWork.repairs.Get(repairId);
            if (repair == null)
                return false;
            Worker worker = unitOfWork.workers.Get(workerId);
            if (worker == null)
                return false;
            action.Worker = worker;
            action.Repair = repair;
            unitOfWork.actions.Update(action);
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
                oldAction.Update(action);
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