using System.Collections;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Repositories;

namespace SerwisKomputerowy.Backend.Services;

public class EquipmentService : IEquipmentService
{
    public IUnitOfWork unitOfWork;

    public EquipmentService(IUnitOfWork unitOfWork)
    {
        this.unitOfWork = unitOfWork;
    }

    public IEnumerable<Equipment> GetEquipments()
    {
        IEnumerable<Equipment> equipments = unitOfWork.equipments.GetAll();
        return equipments;
    }

    public Equipment GetEquipment(int id)
    {
        if (id > 0)
        {
            Equipment equipment = unitOfWork.equipments.Get(id);
            if (equipment != null)
                return equipment;
        }

        return null;
    }

    public bool CreateEquipment(Equipment equipment)
    {
        if (equipment != null)
        {
            unitOfWork.equipments.Create(equipment);
            int result = unitOfWork.Save();
            if (result > 0)
                return true;
        }

        return false;
    }

    public bool EditEquipment(Equipment equipment)
    {
        if (equipment != null)
        {
            Equipment oldEquipment = unitOfWork.equipments.Get(equipment.Id);
            if (oldEquipment != null)
            {
                oldEquipment.Update(equipment);
                unitOfWork.equipments.Update(oldEquipment);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }

    public bool DeleteEquipment(int id)
    {
        if (id > 0)
        {
            Equipment equipment = unitOfWork.equipments.Get(id);
            if (equipment != null)
            {
                unitOfWork.equipments.Delete(equipment);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }
}