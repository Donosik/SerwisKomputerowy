using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Services;

namespace SerwisKomputerowy.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    public readonly IActionService actionService;
    public readonly IClientService clientService;
    public readonly IEquipmentService equipmentService;
    public readonly IMessageService messageService;
    public readonly IPartService partService;
    public readonly IRepairService repairService;
    public readonly IUserService userService;
    public readonly IWorkerService workerService;

    public TestController(IActionService actionService,IClientService clientService,IEquipmentService equipmentService,IMessageService messageService,IPartService partService,IRepairService repairService,IUserService userService,IWorkerService workerService)
    {
        this.actionService = actionService;
        this.clientService = clientService;
        this.equipmentService = equipmentService;
        this.messageService = messageService;
        this.partService = partService;
        this.repairService = repairService;
        this.userService = userService;
        this.workerService = workerService;
    }

    [HttpPost("/usertest")] 
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