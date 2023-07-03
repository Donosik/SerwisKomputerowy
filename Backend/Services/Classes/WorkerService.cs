using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Repositories;

namespace SerwisKomputerowy.Backend.Services;

public class WorkerService : IWorkerService
{
    public IUnitOfWork unitOfWork;

    public WorkerService(IUnitOfWork unitOfWork)
    {
        this.unitOfWork = unitOfWork;
    }

    public IEnumerable<Worker> GetWorkers()
    {
        IEnumerable<Worker> workers = unitOfWork.workers.GetAll();
        return workers;
    }

    public Worker GetWorker(int id)
    {
        if (id > 0)
        {
            Worker worker = unitOfWork.workers.Get(id);
            if (worker != null)
            {
                return worker;
            }
        }

        return null;
    }

    public bool CreateWorker(Worker worker)
    {
        if (worker != null)
        {
            unitOfWork.workers.Create(worker);
            int result = unitOfWork.Save();
            if (result > 0)
                return true;
        }

        return false;
    }

    public bool EditWorker(Worker worker)
    {
        if (worker != null)
        {
            Worker oldWorker = unitOfWork.workers.Get(worker.Id);
            if (oldWorker != null)
            {
                oldWorker.Update(worker);
                unitOfWork.workers.Update(oldWorker);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }

    public bool EditSpecialization(int id, int newSpecialization)
    {
        Worker worker = unitOfWork.workers.Get(id);
        if (worker != null)
        {
            worker.Specialization = (Specialization)newSpecialization;
            unitOfWork.workers.Update(worker);
            int result = unitOfWork.Save();
            if(result>0)
                return true;
        }
        return false;
    }
    public bool EditWorkerToAdmin(int id, bool isAdmin)
    {
        Worker worker = unitOfWork.workers.Get(id);
        if (worker != null)
        {
            User user = worker.User;
            if (user != null)
            {
                if (isAdmin)
                    user.Role = Role.Admin;
                else
                    user.Role = Role.Worker;
                unitOfWork.users.Update(user);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }
        return false;
    }

    public bool DeleteWorker(int id)
    {
        if (id > 0)
        {
            Worker worker = unitOfWork.workers.Get(id);
            if (worker != null)
            {
                unitOfWork.workers.Delete(worker);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }
}