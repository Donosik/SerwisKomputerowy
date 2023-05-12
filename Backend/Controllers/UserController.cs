using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Services;

namespace SerwisKomputerowy.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    public readonly IUserService userService;

    public UserController(IUserService userService)
    {
        this.userService = userService;
    }

    [HttpGet]
    public IActionResult GetUsers()
    {
        IEnumerable<User> users = userService.GetUsers();
        if (users != null)
            return Ok(users);

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

    [HttpPost]
    public IActionResult CreateUser(User user)
    {
        bool isUserCreated = userService.CreateUser(user);
        if (isUserCreated)
            return Ok();
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