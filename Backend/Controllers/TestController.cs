using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Services;

namespace SerwisKomputerowy.Controllers;

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
    private readonly IIdentityService identityService;

    public TestController(IActionService actionService, IClientService clientService,
        IEquipmentService equipmentService, IMessageService messageService, IPartService partService,
        IRepairService repairService, IUserService userService, IWorkerService workerService,IIdentityService identityService)
    {
        this.actionService = actionService;
        this.clientService = clientService;
        this.equipmentService = equipmentService;
        this.messageService = messageService;
        this.partService = partService;
        this.repairService = repairService;
        this.userService = userService;
        this.workerService = workerService;
        this.identityService = identityService;
    }

    [HttpGet("user")]
    public IActionResult NewUser()
    {
        User user = new User();
        user.Login = "log";
        user.Password = "123";
        user.Role = Role.User;
        user.Messages = null;
        userService.CreateUser(user);

        return Ok();
    }

    [HttpGet("eq")]
    public IActionResult NewEquipment()
    {
        Equipment equipment = new Equipment();
        equipment.Type = "Typ";
        equipment.Name = "Nazwa";
        equipment.ProductionDate=DateTime.Now;
        equipmentService.CreateEquipment(equipment);
        return Ok();
    }

    [HttpGet("repair")]
    public IActionResult NewRepair()
    {
        Repair repair = new Repair();
        repair.Type = RepairType.Zwykla;
        repair.IsGuarantee = true;
        repair.GuaranteeTime=DateTime.Now;
        repair.AcceptanceTime=DateTime.Now;
        repair.ReturnTime = DateTime.Now;
        repair.Status = Status.Skonoczone;
        repair.Equipment = equipmentService.GetEquipment(1);
        repairService.CreateRepair(repair);
        equipmentService.GetEquipment(1).Repairs.Add(repair);
        equipmentService.EditEquipment(equipmentService.GetEquipment(1));
        return Ok();
    }

    [HttpGet]
    public IActionResult Test()
    {
        return Ok(repairService.GetRepair(1).Equipment);
    }
}

