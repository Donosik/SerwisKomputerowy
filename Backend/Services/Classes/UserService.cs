using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Repositories;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace SerwisKomputerowy.Backend.Services;

public class UserService : IUserService
{
    private readonly IConfiguration configuration;
    private readonly IHttpContextAccessor httpContextAccessor;
    private readonly IUnitOfWork unitOfWork;

    public UserService(IConfiguration configuration,IHttpContextAccessor httpContextAccessor,IUnitOfWork unitOfWork)
    {
        this.configuration = configuration;
        this.httpContextAccessor = httpContextAccessor;
        this.unitOfWork = unitOfWork;
    }

    public bool Register(RegisterUser registerUser)
    {
        User user = new User();
        user.Login = registerUser.login;
        user.Password = registerUser.password;
        return CreateUser(user);
    }

    public User Login(LoginUser loginUser)
    {
        foreach (User user in GetUsers())
        {
            if ((user.Login == loginUser.login) && (user.Password == loginUser.password))
            {
                return user;
            }
        }

        return null;
    }

    public string GenerateJwtToken(User user)
    {
        var issuer = configuration["JwtSettings:Issuer"];
        var audience = configuration["JwtSettings:Audience"];
        var key = configuration["JwtSettings:Key"];
        var expiration = DateTime.UtcNow.AddHours(8);

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: expiration,
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public User GetCurrentUser()
    {
        if (httpContextAccessor.HttpContext != null)
        {
            try
            {
                User user = GetUser(Int32.Parse(ClaimTypes.Name));
                return user;
            }
            catch (Exception e)
            {
                return null;
            }
        }

        return null;
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