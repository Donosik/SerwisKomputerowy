﻿using Microsoft.AspNetCore.Mvc;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Services;

namespace SerwisKomputerowy.Controllers;

[ApiController]
[Route("[controller]")]
public class PartController : ControllerBase
{
    public IPartService partService;

    public PartController(IPartService partService)
    {
        this.partService = partService;
    }

    [HttpGet]
    public IActionResult GetParts()
    {
        IEnumerable<Part> parts = partService.GetParts();
        if (parts != null)
            return Ok(parts);
        return NotFound();
    }

    [HttpGet("{id}")]
    public IActionResult GetPart(int id)
    {
        Part part = partService.GetPart(id);
        if (part != null)
            return Ok(part);
        return NotFound();
    }

    [HttpPost]
    public IActionResult CreatePart(Part part)
    {
        bool isPartCreated = partService.CreatePart(part);
        if (isPartCreated)
            return Ok();
        return BadRequest();
    }

    [HttpPut]
    public IActionResult EditPart(Part part)
    {
        bool isPartEdited = partService.EditPart(part);
        if (isPartEdited)
            return Ok();
        return BadRequest();
    }

    [HttpDelete("{id}")]
    public IActionResult DeletePart(int id)
    {
        bool isPartDeleted = partService.DeletePart(id);
        if (isPartDeleted)
            return Ok();
        return NotFound();
    }
}