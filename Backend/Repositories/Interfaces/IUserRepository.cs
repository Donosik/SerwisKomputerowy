using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public interface IUserRepository : IGenericRepository<User>
{
    IEnumerable<Message> GetMessages(int id);
}