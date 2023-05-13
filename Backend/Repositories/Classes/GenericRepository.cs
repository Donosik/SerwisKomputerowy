using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public abstract class GenericRepository<T> : IGenericRepository<T> where T : class
{
    protected readonly DatabaseContext dbContext;

    protected GenericRepository(DatabaseContext dbContext)
    {
        this.dbContext = dbContext;
    }

    public IEnumerable<T> GetAll()
    {
        return dbContext.Set<T>().ToList();
    }

    public T Get(int id)
    {
        return dbContext.Set<T>().Find(id);
    }

    public bool Create(T entity)
    { 
        dbContext.Set<T>().Add(entity);
        return true;
    }

    public bool Update(T entity)
    {
        dbContext.Set<T>().Update(entity);
        return true;
    }

    public bool Delete(T entity)
    {
        dbContext.Set<T>().Remove(entity);
        return true;
    }
}