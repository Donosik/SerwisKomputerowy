using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.DB;
using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Repositories;

public class MessageRepository : GenericRepository<Message>, IMessageRepository
{
    public MessageRepository(DatabaseContext dbContext) : base(dbContext)
    {
    }

    public override IQueryable<Message> GetQuery()
    {
        return dbContext.Set<Message>().
            Include(m => m.User).
            Include(m => m.Repair);
    }
}