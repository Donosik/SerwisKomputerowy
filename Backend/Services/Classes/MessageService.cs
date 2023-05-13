using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Repositories;

namespace SerwisKomputerowy.Backend.Services;

public class MessageService : IMessageService
{
    public IUnitOfWork unitOfWork;

    public MessageService(IUnitOfWork unitOfWork)
    {
        this.unitOfWork = unitOfWork;
    }

    public IEnumerable<Message> GetMessages()
    {
        IEnumerable<Message> messages = unitOfWork.messages.GetAll();
        return messages;
    }

    public Message GetMessage(int id)
    {
        if (id > 0)
        {
            Message message = unitOfWork.messages.Get(id);
            if (message != null)
            {
                return message;
            }
        }

        return null;
    }

    public bool CreateMessage(Message message)
    {
        if (message != null)
        {
            unitOfWork.messages.Create(message);
            int result = unitOfWork.Save();
            if (result > 0)
                return true;
        }

        return false;
    }

    public bool EditMessage(Message message)
    {
        if (message != null)
        {
            Message oldMessage = unitOfWork.messages.Get(message.Id);
            if (oldMessage != null)
            {
                oldMessage.Update(message);
                unitOfWork.messages.Update(oldMessage);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }

    public bool DeleteMessage(int id)
    {
        if (id > 0)
        {
            Message message = unitOfWork.messages.Get(id);
            if (message != null)
            {
                unitOfWork.messages.Delete(message);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }
}