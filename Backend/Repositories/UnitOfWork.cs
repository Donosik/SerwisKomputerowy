using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Services;

namespace SerwisKomputerowy.Backend.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly DatabaseContext dbContext;
    public IUserRepository users { get; }

    public UnitOfWork(DatabaseContext dbContext, IUserRepository userRepository)
    {
        this.dbContext = dbContext;
        users = userRepository;
    }

    public int Save()
    {
        return dbContext.SaveChanges();
    }

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (disposing)
        {
            dbContext.Dispose();
        }
    }
}