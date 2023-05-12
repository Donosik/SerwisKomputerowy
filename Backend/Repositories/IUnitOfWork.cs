namespace SerwisKomputerowy.Backend.Repositories;

public interface IUnitOfWork : IDisposable
{
    IUserRepository users { get; }

    int Save();
}