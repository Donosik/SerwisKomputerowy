namespace SerwisKomputerowy.Backend.Repositories;

public interface IUnitOfWork : IDisposable
{
    IActionRepository actions { get; }
    IClientRepository clients { get; }
    IEquipmentRepository equipments { get; }
    IMessageRepository messages { get; }
    IPartRepository parts { get; }
    IRepairRepository repairs { get; }
    IUserRepository users { get; }
    IWorkerRepository workers { get; }

    int Save();
}