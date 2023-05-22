using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Repositories;

namespace SerwisKomputerowy.Backend.Services;

public class UserService : IUserService
{
    public IUnitOfWork unitOfWork;

    public UserService(IUnitOfWork unitOfWork)
    {
        this.unitOfWork = unitOfWork;
    }

    public IEnumerable<User> GetUsers()
    {
        IEnumerable<User> users = unitOfWork.users.GetAll();
        return users;
    }

    public User GetUser(int id)
    {
        if (id > 0)
        {
            User user = unitOfWork.users.Get(id);
            if (user != null)
                return user;
        }

        return null;
    }

    public IEnumerable<Message> GetMessagesOfUser(int id)
    {
        IEnumerable<Message> messages = unitOfWork.users.GetMessages(id);
        return messages;
    }

    public bool CreateUser(User user)
    {
        if (user != null)
        {
            unitOfWork.users.Create(user);
            int result = unitOfWork.Save();
            if (result > 0)
                return true;
        }

        return false;
    }

    public bool EditUser(User user)
    {
        if (user != null)
        {
            User oldUser = unitOfWork.users.Get(user.Id);
            if (oldUser != null)
            {
                oldUser.Update(user);
                unitOfWork.users.Update(oldUser);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }

    public bool DeleteUser(int id)
    {
        if (id > 0)
        {
            User user = unitOfWork.users.Get(id);
            if (user != null)
            {
                unitOfWork.users.Delete(user);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
            }
        }

        return false;
    }
}