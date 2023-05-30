using System.Security.Claims;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Repositories;

namespace SerwisKomputerowy.Backend.Services;

public class IdentityService : IIdentityService
{
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly IUnitOfWork unitOfWork;

    public IdentityService(IHttpContextAccessor httpContextAccessor, IUnitOfWork unitOfWork)
    {
        this.httpContextAccessor = httpContextAccessor;
        this.unitOfWork = unitOfWork;
    }
    
    public User GetCurrentUser()
    {
        if (httpContextAccessor.HttpContext != null)
        {
            try
            {
                String name = httpContextAccessor.HttpContext.User.FindFirstValue(ClaimTypes.Name);
                User user = GetUser(Int32.Parse(name));
                return user;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        return null;
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
}