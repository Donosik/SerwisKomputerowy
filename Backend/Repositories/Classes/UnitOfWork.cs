using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Services;

namespace SerwisKomputerowy.Backend.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly DatabaseContext dbContext;

    public IActionRepository actions { get; }
    public IClientRepository clients { get; }
    public IEquipmentRepository equipments { get; }
    public IMessageRepository messages { get; }
    public IPartRepository parts { get; }
    public IRepairRepository repairs { get; }
    public IUserRepository users { get; }
    public IWorkerRepository workers { get; }

    public UnitOfWork(DatabaseContext dbContext, IActionRepository actionRepository, IClientRepository clientRepository,
        IEquipmentRepository equipmentRepository, IMessageRepository messageRepository, IPartRepository partRepository,
        IRepairRepository repairRepository, IUserRepository userRepository, IWorkerRepository workerRepository)
    {
        this.dbContext = dbContext;
        actions = actionRepository;
        clients = clientRepository;
        equipments = equipmentRepository;
        messages = messageRepository;
        parts = partRepository;
        repairs = repairRepository;
        users = userRepository;
        workers = workerRepository;
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