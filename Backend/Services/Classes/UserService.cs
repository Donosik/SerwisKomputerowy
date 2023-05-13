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

    public bool CreateUser(User user)
    {
        if (user != null)
        {
            unitOfWork.users.Create(user);
            int result = unitOfWork.Save();
            if (result > 0)
                return true;
            else
                return false;
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
                oldUser.Login = user.Login;
                oldUser.Password = user.Password;
                oldUser.Role = user.Role;
                oldUser.Messages = user.Messages;
                unitOfWork.users.Update(oldUser);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
                else
                    return false;
            }
            else
            {
            }
        }

        return false;
    }

    public bool DeleteUser(int id)
    {
        if (id > 0)
        {
            var user = unitOfWork.users.Get(id);
            if (user != null)
            {
                unitOfWork.users.Delete(user);
                int result = unitOfWork.Save();
                if (result > 0)
                    return true;
                else
                    return false;
            }
        }

        return false;
    }
}