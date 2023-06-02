﻿using Microsoft.EntityFrameworkCore;
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
        return dbContext.Set<Equipment>().Include(e => e.Repairs).ToList();
    }
}