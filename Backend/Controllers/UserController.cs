
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Services;

namespace SerwisKomputerowy.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserService userService;
    private readonly IIdentityService identityService;
    
    public UserController(IUserService userService,IIdentityService identityService)
    {
        this.userService = userService;
        this.identityService = identityService;
    }
    
    [AllowAnonymous]
    [HttpPost("Register")]
    public IActionResult Register(RegisterUser registerUser)
    {
        if (userService.Register(registerUser))
            return Ok();
        return BadRequest();
    }

    [AllowAnonymous]
    [HttpPost("Login")]
    public IActionResult Login(LoginUser loginUser)
    {
        User user = userService.Login(loginUser);
        if (user!=null)
            return Ok(userService.GenerateJwtToken(user));
        return NotFound(loginUser);
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        IEnumerable<User> users = userService.GetUsers();
        if (users != null)
            return Ok(users);

        return NotFound();
    }
    
    [HttpGet("me")]
    public IActionResult GetMe()
    {
        User user = identityService.GetCurrentUser();
        if (user != null)
            return Ok(user);
        return NotFound();
    }

    [HttpGet("{id}")]
    public IActionResult GetUser(int id)
    {
        User user = userService.GetUser(id);
        if (user != null)
            return Ok(user);

        return NotFound();
    }

    [HttpGet("{id}/messages")]
    public IActionResult GetMessagesOfUser(int id)
    {
        IEnumerable<Message> messages = userService.GetMessagesOfUser(id);
        if (messages != null)
            return Ok(messages);

        return NotFound();
    }

    [HttpPost]
    public IActionResult CreateUser(User user)
    {
        bool isUserCreated = userService.CreateUser(user);
        if (isUserCreated)
            return Ok(user.Id);
        return BadRequest();
    }

    [HttpPut]
    public IActionResult EditUser(User user)
    {
        bool isUserEdited = userService.EditUser(user);
        if (isUserEdited)
            return Ok();
        return BadRequest();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteUser(int id)
    {
        bool isUserDeleted = userService.DeleteUser(id);
        if (isUserDeleted)
            return Ok();
        return NotFound();
    }
}