using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Services;
using Action = SerwisKomputerowy.Backend.Entities.Action;

namespace SerwisKomputerowy.Controllers;

[AllowAnonymous]
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


    private void createdb1()
    {
        //ADMIN
        User admin = new User();
        admin.Login = "admin";
        admin.Password = "admin";
        admin.Role = Role.Admin;
        admin.Messages = new List<Message>();
        userService.CreateUser(admin);

        //Pracownik1
        User worker1 = new User();
        worker1.Login = "worker1";
        worker1.Password = "123";
        worker1.Role = Role.Worker;
        worker1.Messages = new List<Message>();
        userService.CreateUser(worker1);

        //Pracownik2
        User worker2 = new User();
        worker2.Login = "worker2";
        worker2.Password = "123";
        worker2.Role = Role.Worker;
        worker2.Messages = new List<Message>();
        userService.CreateUser(worker2);

        //User1
        User user1 = new User();
        user1.Login = "user1";
        user1.Password = "123";
        user1.Role = Role.User;
        user1.Messages = new List<Message>();
        userService.CreateUser(user1);

        //User2
        User user2 = new User();
        user2.Login = "user2";
        user2.Password = "123";
        user2.Role = Role.User;
        user2.Messages = new List<Message>();
        userService.CreateUser(user2);

        //Klient1 with no repairs
        Client client1 = new Client();
        client1.User = user1;
        client1.FirstName = "Jacek";
        client1.LastName = "Jaworek";
        client1.Repairs = new List<Repair>();
        clientService.CreateClient(client1);

        //Klient2 with one repair
        Client client2 = new Client();
        client2.User = user2;
        client2.FirstName = "Krzysztof";
        client2.LastName = "Kononowicz";
        client2.Repairs = new List<Repair>();
        clientService.CreateClient(client2);

        //Equipment dla repair1
        Equipment equipment1 = new Equipment();
        equipment1.Type = "typ";
        equipment1.Name = "nazwa";
        equipment1.ProductionDate = DateTime.Now;
        equipment1.Repairs = new List<Repair>();
        equipmentService.CreateEquipment(equipment1);
        
        //Naprawa dla klienta2
        Repair repair1 = new Repair();
        repair1.Type = RepairType.Zwykla;
        repair1.IsGuarantee = false;
        repair1.GuaranteeTime = DateTime.Now;
        repair1.AcceptanceTime = DateTime.Now;
        repair1.ReturnTime = DateTime.Now;
        repair1.Status = Status.Przyjete;
        repair1.Client = client2;
        repair1.Messages = new List<Message>();
        repair1.Parts = new List<Part>();
        repair1.Equipment = equipment1;
        repair1.Actions = new List<Action>();
        repairService.CreateRepair(repair1);

        // Part1 for repair1
        Part part1 = new Part();
        part1.PartName = "czesc1";
        part1.Cost = 100;
        part1.CostOfWork = 10;
        part1.Repair = repair1;
        partService.CreatePart(part1);

    }

    [HttpGet("createDB")]
    public IActionResult CreateDBTest()
    {
        createdb1();
        return Ok();
    }

    private void deletedb1()
    {
        var eqs = equipmentService.GetEquipments();
        foreach(var eq in eqs)
        {
            equipmentService.DeleteEquipment(eq.Id);
        }
        var repairs = repairService.GetRepairs();
        foreach(var repair in repairs)
        {
            repairService.DeleteRepair(repair.Id);
        }
        var parts=partService.GetParts();
        foreach(var part in parts)
        {
            partService.DeletePart(part.SerialNumber);
        }
        var actions = actionService.GetActions();
        foreach (var action in actions)
        {
            actionService.DeleteAction(action.Id);
        }
        var msgs = messageService.GetMessages();
        foreach (var msg in msgs)
        {
            messageService.DeleteMessage(msg.Id);
        }
        var workers = workerService.GetWorkers();
        foreach(var worker in workers)
        {
            workerService.DeleteWorker(worker.Id);
        }
        var clients = clientService.GetClients();
        foreach(var client in clients)
        {
            clientService.DeleteClient(client.Id);
        }
        var users=userService.GetUsers();
        foreach(var user in users)
        {
            userService.DeleteUser(user.Id);
        }
    }

    [HttpGet("deleteDB")]
    public IActionResult DeleteDBTest()
    {
        deletedb1();
        return Ok();
    }
}

