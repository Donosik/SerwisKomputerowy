using System.Collections;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Services;
using Action = System.Action;

namespace SerwisKomputerowy.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class RepairController : ControllerBase
{
    public IRepairService repairService;

    public RepairController(IRepairService repairService)
    {
        this.repairService = repairService;
    }

    [HttpGet]
    public IActionResult GetRepairs()
    {
        IEnumerable<Repair> repairs = repairService.GetRepairs();
        if (repairs != null)
            return Ok(repairs);
        return NotFound();
    }

    [HttpGet("{id}")]
    public IActionResult GetRepair(int id)
    {
        Repair repair = repairService.GetRepair(id);
        if (repair != null)
            return Ok(repair);
        return NotFound();
    }

    [HttpGet("table")]
    public IActionResult GetRepairsForTable()
    {
        IEnumerable<Repair> repairs = repairService.GetRepairsForTable();
        if (repairs != null)
            return Ok(repairs);
        return NotFound();
    }

    [HttpGet("{id}/messages")]
    public IActionResult GetMessagesOfRepair(int id)
    {
        IEnumerable<Message> messages = repairService.GetMessagesOfRepair(id);
        if (messages != null)
            return Ok(messages);

        return NotFound();
    }

    [HttpGet("client/{clientId}")]
    public IActionResult GetRepairsOfClient(int clientId)
    {
        IEnumerable<Repair> repairs = repairService.GetRepairsOfClient(clientId);
        if (repairs != null)
            return Ok(repairs);
        return NotFound();
    }
    
    
    
    [HttpPost]
    public IActionResult CreateRepair(Repair repair)
    {
        bool isRepairCreated = repairService.CreateRepair(repair);
        if (isRepairCreated)
            return Ok(repair.Id);
        return BadRequest();
    }

    [HttpPut]
    public IActionResult EditRepair([FromBody] Repair repair)
    {
        bool isRepairEdited = repairService.EditRepair(repair);
        if (isRepairEdited)
            return Ok();
        return BadRequest();
    }

    [HttpPut("{idrepair}/{idclient}")]
    public IActionResult EditClientId(int idrepair, int idclient)
    {
        bool isRepairEdited = repairService.EditClientId(idrepair, idclient);
        if (isRepairEdited)
            return Ok();
        return NotFound();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteRepair(int id)
    {
        bool isRepairDeleted = repairService.DeleteRepair(id);
        if (isRepairDeleted)
            return Ok();
        return NotFound();
    }
}