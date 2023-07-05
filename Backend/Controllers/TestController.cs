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
        //userService.CreateUser(admin);
        Worker worker = new Worker();
        worker.FirstName = "Admin";
        worker.LastName = "Adminowski";
        worker.BirthDate=DateTime.Now;
        worker.Specialization = Specialization.Elektronik;
        worker.User = admin;
        workerService.CreateWorker(worker);

        //Pracownik1
        User worker1 = new User();
        worker1.Login = "worker1";
        worker1.Password = "123";
        worker1.Role = Role.Worker;
        worker1.Messages = new List<Message>();
        //userService.CreateUser(worker1);
        Worker worker11 = new Worker();
        worker11.FirstName = "Damian";
        worker11.LastName = "Backendowski";
        worker11.BirthDate = DateTime.Now;
        worker11.Specialization = Specialization.Drukarki;
        worker11.User = worker1;
        workerService.CreateWorker(worker11);

        //Pracownik2
        User worker2 = new User();
        worker2.Login = "worker2";
        worker2.Password = "123";
        worker2.Role = Role.Worker;
        worker2.Messages = new List<Message>();
        //userService.CreateUser(worker2);
        Worker worker21 = new Worker();
        worker21.FirstName = "Paweł";
        worker21.LastName = "Frontendowski";
        worker21.BirthDate = DateTime.Now;
        worker21.Specialization = Specialization.Telefony;
        worker21.User = worker2;
        workerService.CreateWorker(worker21);
// Pracownik3
        User worker3 = new User();
        worker3.Login = "worker3";
        worker3.Password = "123";
        worker3.Role = Role.Worker;
        worker3.Messages = new List<Message>();
        //userService.CreateUser(worker3);
        Worker worker31 = new Worker();
        worker31.FirstName = "Anna";
        worker31.LastName = "Grafikowska";
        worker31.BirthDate = DateTime.Now;
        worker31.Specialization = Specialization.Drukarki;
        worker31.User = worker3;
        workerService.CreateWorker(worker31);

// Pracownik4
        User worker4 = new User();
        worker4.Login = "worker4";
        worker4.Password = "123";
        worker4.Role = Role.Worker;
        worker4.Messages = new List<Message>();
        //userService.CreateUser(worker4);
        Worker worker41 = new Worker();
        worker41.FirstName = "Michał";
        worker41.LastName = "Backendowski";
        worker41.BirthDate = DateTime.Now;
        worker41.Specialization = Specialization.OdzyskiwanieDanych;
        worker41.User = worker4;
        workerService.CreateWorker(worker41);

// Pracownik5
        User worker5 = new User();
        worker5.Login = "worker5";
        worker5.Password = "123";
        worker5.Role = Role.Worker;
        worker5.Messages = new List<Message>();
        //userService.CreateUser(worker5);
        Worker worker51 = new Worker();
        worker51.FirstName = "Ewa";
        worker51.LastName = "Supportowska";
        worker51.BirthDate = DateTime.Now;
        worker51.Specialization = Specialization.AGD;
        worker51.User = worker5;
        workerService.CreateWorker(worker51);

// Pracownik6
        User worker6 = new User();
        worker6.Login = "worker6";
        worker6.Password = "123";
        worker6.Role = Role.Worker;
        worker6.Messages = new List<Message>();
        //userService.CreateUser(worker6);
        Worker worker61 = new Worker();
        worker61.FirstName = "Marcin";
        worker61.LastName = "Sieciowiec";
        worker61.BirthDate = DateTime.Now;
        worker61.Specialization = Specialization.Telefony;
        worker61.User = worker6;
        workerService.CreateWorker(worker61);
       
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

        // Part1
        Part part1 = new Part();
        part1.PartName = "Procesor Intel Core i9-10900K";
        part1.SerialNumber = 3428909;
        part1.Cost = 500;
        part1.CostOfWork = 50;
        part1.IsUsed = false;
        partService.CreatePart(part1);

// Part2
        Part part2 = new Part();
        part2.PartName = "Karta graficzna NVIDIA GeForce RTX 3080";
        part2.SerialNumber = 9837452;
        part2.Cost = 800;
        part2.CostOfWork = 80;
        part2.IsUsed = false;
        partService.CreatePart(part2);

// Part3
        Part part3 = new Part();
        part3.PartName = "Pamięć RAM DDR4 16GB";
        part3.SerialNumber = 5678921;
        part3.Cost = 100;
        part3.CostOfWork = 10;
        part3.IsUsed = false;
        partService.CreatePart(part3);

// Part4
        Part part4 = new Part();
        part4.PartName = "Dysk SSD 1TB";
        part4.SerialNumber = 3782956;
        part4.Cost = 200;
        part4.CostOfWork = 20;
        part4.IsUsed = false;
        partService.CreatePart(part4);

// Part5
        Part part5 = new Part();
        part5.PartName = "Zasilacz 750W";
        part5.SerialNumber =1357924;
        part5.Cost = 150;
        part5.CostOfWork = 15;
        part5.IsUsed = false;
        partService.CreatePart(part5);

// Part6
        Part part6 = new Part();
        part6.PartName = "Płyta główna ASUS ROG Strix Z590-E Gaming";
        part6.SerialNumber = 6849203;
        part6.Cost = 300;
        part6.CostOfWork = 30;
        part6.IsUsed = false;
        partService.CreatePart(part6);

// Part7
        Part part7 = new Part();
        part7.PartName = "Chłodzenie wodne NZXT Kraken X73";
        part7.SerialNumber = 2574906;
        part7.Cost = 250;
        part7.CostOfWork = 25;
        part7.IsUsed = false;
        partService.CreatePart(part7);

// Part8
        Part part8 = new Part();
        part8.PartName = "Obudowa Corsair iCUE 5000X RGB";
        part8.SerialNumber = 6093184;
        part8.Cost = 150;
        part8.CostOfWork = 15;
        part8.IsUsed = false;
        part8.Repair = repair1;
        partService.CreatePart(part8);

        Action action=new Action();
        action.Description = "TEST";
        action.Worker = worker21;
        action.Repair = repair1;
        actionService.CreateAction(action);

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
            partService.DeletePart(part.Id);
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

