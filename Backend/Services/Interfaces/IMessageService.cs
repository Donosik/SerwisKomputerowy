using SerwisKomputerowy.Backend.Entities;

namespace SerwisKomputerowy.Backend.Services;

public interface IMessageService
{
    IEnumerable<Message> GetMessages();
    Message GetMessage(int id);
    bool CreateMessage(Message message);
    bool EditMessage(Message message);
    bool DeleteMessage(int id);
}