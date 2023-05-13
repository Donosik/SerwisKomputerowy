using Microsoft.AspNetCore.Mvc;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Services;

namespace SerwisKomputerowy.Controllers;

[ApiController]
[Route("[controller]")]
public class ClientController : ControllerBase
{
    public readonly IClientService clientServive;

    public ClientController(IClientService clientServive)
    {
        this.clientServive = clientServive;
    }

    [HttpGet]
    public IActionResult GetClients()
    {
        IEnumerable<Client> clients = clientServive.GetClients();
        if (clients != null)
            return Ok(clients);
        return NotFound();
    }

    [HttpGet("{id}")]
    public IActionResult GetClient(int id)
    {
        Client client = clientServive.GetClient(id);
        if (client != null)
            return Ok(client);
        return NotFound();
    }

    [HttpPost]
    public IActionResult CreateClient(Client client)
    {
        bool isClientCreated = clientServive.CreateClient(client);
        if (isClientCreated)
            return Ok();
        return BadRequest();
    }

    [HttpPut]
    public IActionResult EditClient(Client client)
    {
        bool isClientEdited = clientServive.EditClient(client);
        if (isClientEdited)
            return Ok();
        return BadRequest();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteClient(int id)
    {
        bool isClientDeleted = clientServive.DeleteClient(id);
        if (isClientDeleted)
            return Ok();
        return BadRequest();
    }
}