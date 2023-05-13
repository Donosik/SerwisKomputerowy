using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Services;

namespace SerwisKomputerowy.Controllers;

[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    public readonly IUserService userService;

    public TestController(IUserService userService)
    {
        this.userService = userService;
    }

    [HttpGet] 
    public IActionResult Get()
    {
        User user = new User();
        user.Login = "lg";
        user.Password = "123";
        user.Role = Role.User;
        user.Messages = null;
        userService.CreateUser(user);

        return Ok();
    }
}