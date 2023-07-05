using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Repositories;

namespace SerwisKomputerowy.Backend.Services;

public class PartService : IPartService
{
    public IUnitOfWork unitOfWork;

    public PartService(IUnitOfWork unitOfWork)
    {
        this.unitOfWork = unitOfWork;
    }
    public IEnumerable<Part> GetParts()
    {
        IEnumerable<Part> parts = unitOfWork.parts.GetAll();
        return parts;
    }

    public Part GetPart(int id)
    {
        if (id > 0)
        {
            Part part = unitOfWork.parts.Get(id);
            if (part != null)
                return part;
        }

        return null;
    }

    public IEnumerable<Part> PartsSearchedByName(String name, bool isUsed)
    {
        IEnumerable<Part> parts = unitOfWork.parts.PartsSearchedByName(name, isUsed);
        return parts;
    }

    public bool CreatePart(Part part)
    {
        if (part != null)
        {
            unitOfWork.parts.Create(part);
            int result = unitOfWork.Save();
            if (result > 0)
                return true;
        }

        return false;
    }

    public bool EditPart(Part part)
    {
        if (part != null)
        {
            Part oldPart = unitOfWork.parts.Get(part.Id);
            if (oldPart != null)
            {
                oldPart.Update(part);
                unitOfWork.parts.Update(oldPart);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }

    public bool DeletePart(int id)
    {
        if (id > 0)
        {
            Part part = unitOfWork.parts.Get(id);
            if (part != null)
            {
                unitOfWork.parts.Delete(part);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }
}