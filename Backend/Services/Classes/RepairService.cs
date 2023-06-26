using System.Collections;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Repositories;

namespace SerwisKomputerowy.Backend.Services;

public class RepairService : IRepairService
{
    public IUnitOfWork unitOfWork;

    public RepairService(IUnitOfWork unitOfWork)
    {
        this.unitOfWork = unitOfWork;
    }

    public IEnumerable<Repair> GetRepairs()
    {
        IEnumerable<Repair> repairs = unitOfWork.repairs.GetAll();
        return repairs;
    }

    public Repair GetRepair(int id)
    {
        if (id > 0)
        {
            Repair repair = unitOfWork.repairs.Get(id);
            if (repair != null)
                return repair;
        }

        return null;
    }

    public bool CreateRepair(Repair repair)
    {
        if (repair != null)
        {
            unitOfWork.repairs.Create(repair);
            int result = unitOfWork.Save();
            if (result > 0)
                return true;
        }

        return false;
    }

    public bool EditRepair(Repair repair)
    {
        if (repair != null)
        {
            Repair oldRepair = unitOfWork.repairs.Get(repair.Id);
            if (oldRepair != null)
            {
                oldRepair.Update(repair);
                unitOfWork.repairs.Update(oldRepair);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }

    public bool EditClientId(int idrepair,int idclient)
    {
        Client client = unitOfWork.clients.Get(idclient);
        if (client != null)
        {
            Repair repair = unitOfWork.repairs.Get(idrepair);
            repair.Client = client;
            unitOfWork.repairs.Update(repair);
            int result = unitOfWork.Save();
            if (result > 0)
                return true;
        }
        return false;
    }
    public bool DeleteRepair(int id)
    {
        if (id > 0)
        {
            Repair repair = unitOfWork.repairs.Get(id);
            if (repair != null)
            {
                unitOfWork.repairs.Delete(repair);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }

    public IEnumerable<Repair> GetRepairsForTable()
    {
        IEnumerable<Repair> repairs = unitOfWork.repairs.GetRepairsForTable();
        return repairs;
    }
    
    public IEnumerable<Message> GetMessagesOfRepair(int id)
    {
        IEnumerable<Message> messages = unitOfWork.repairs.GetMessages(id);
        return messages;
    }
}