﻿using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public class PartRepository : GenericRepository<Part>, IPartRepository
{
    public PartRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }

    public IQueryable<Part> GetQuery()
    {
        return dbContext.Set<Part>().Include(p => p.Repair);
    }

    public IEnumerable<Part> PartsSearchedByName(String name, bool isUsed)
    {
        return dbContext.Set<Part>().Include(p=>p.Repair).Where(p => p.IsUsed == isUsed).Where(p=>p.PartName.Contains(name)).ToList();
    }

    public IEnumerable<Part> GetPartsFromRepair(int repairId)
    {
        return dbContext.Set<Part>().Where(p => p.Repair.Id == repairId).ToList();
    }

    public Part GetBySN(int partSN)
    {
        return dbContext.Set<Part>().Where(p => p.SerialNumber == partSN).FirstOrDefault();
    }
}