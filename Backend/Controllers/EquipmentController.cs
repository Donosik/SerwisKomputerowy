using Microsoft.AspNetCore.Mvc;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Services;

namespace SerwisKomputerowy.Controllers;

[ApiController]
[Route("[controller]")]
public class EquipmentController : ControllerBase
{
    public readonly IEquipmentService equipmentService;

    public EquipmentController(IEquipmentService equipmentService)
    {
        this.equipmentService = equipmentService;
    }

    [HttpGet]
    public IActionResult GetEquipments()
    {
        IEnumerable<Equipment> equipments = equipmentService.GetEquipments();
        if (equipments != null)
            return Ok(equipments);
        return NotFound();
    }

    [HttpGet("{id}")]
    public IActionResult GetEquipment(int id)
    {
        Equipment equipment = equipmentService.GetEquipment(id);
        if (equipment != null)
            return Ok(equipment);
        return NotFound();
    }

    [HttpPost]
    public IActionResult CreateEquipment(Equipment equipment)
    {
        bool isEquipmentCreated = equipmentService.CreateEquipment(equipment);
        if (isEquipmentCreated)
            return Ok();
        return BadRequest();
    }

    [HttpPut]
    public IActionResult EditEquipment(Equipment equipment)
    {
        bool isEquipmentEdited = equipmentService.EditEquipment(equipment);
        if (isEquipmentEdited)
            return Ok();
        return BadRequest();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteEquipment(int id)
    {
        bool isEquipmentDeleted = equipmentService.DeleteEquipment(id);
        if (isEquipmentDeleted)
            return Ok();
        return NotFound();
    }
    
}