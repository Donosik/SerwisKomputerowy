using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public class EquipmentRepository : GenericRepository<Equipment>, IEquipmentRepository
{
    public EquipmentRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }
    
    public IEnumerable<Equipment> GetAll()
    {
        return dbContext.Set<Equipment>().Select(e=>new Equipment
        {
            Id=e.Id,
            Type = e.Type,
            Name=e.Name,
            ProductionDate =e.ProductionDate
        }).ToList();
    }
}