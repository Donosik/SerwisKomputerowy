﻿using System.Collections;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Services;

namespace SerwisKomputerowy.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class WorkerController : ControllerBase
{
    public IWorkerService workerService;

    public WorkerController(IWorkerService workerService)
    {
        this.workerService = workerService;
    }

    [HttpGet]
    public IActionResult GetWorkers()
    {
        IEnumerable<Worker> workers = workerService.GetWorkers();
        if (workers != null)
            return Ok(workers);
        return NotFound();
    }

    [HttpGet("{id}")]
    public IActionResult GetWorker(int id)
    {
        Worker worker = workerService.GetWorker(id);
        if (worker != null)
            return Ok(worker);
        return NotFound();
    }

    [HttpGet("me/{userId}")]
    public IActionResult GetMeAsWorker(int userId)
    {
        Worker worker = workerService.GetMeAsWorker(userId);
        if (worker != null)
            return Ok(worker);
        return NotFound();
    }

    [HttpGet("repair/{repairId}")]
    public IActionResult GetWorkersFromRepair(int repairId)
    {
        IEnumerable<Worker> workers = workerService.GetWorkersFromRepair(repairId);
        if (workers != null)
            return Ok(workers);
        return NotFound();
    }

    [HttpPost]
    public IActionResult CreateWorker(Worker worker)
    {
        bool isWorkerCreated = workerService.CreateWorker(worker);
        if (isWorkerCreated)
            return Ok(worker.Id);
        return BadRequest();
    }

    [HttpPut]
    public IActionResult EditWorker(Worker worker)
    {
        bool isWorkerEdited = workerService.EditWorker(worker);
        if (isWorkerEdited)
            return Ok();
        return BadRequest();
    }

    [HttpPut("{id}/specialization/{newSpecialization}")]
    public IActionResult EditSpecialization(int id, int newSpecialization)
    {
        bool isWorkerEdited = workerService.EditSpecialization(id, newSpecialization);
        if (isWorkerEdited)
            return Ok();
        return BadRequest();
    }

    [HttpPut("{id}/admin/{isAdmin}")]
    public IActionResult EditWorkerToAdmin(int id, bool isAdmin)
    {
        bool isWorkerEdited = workerService.EditWorkerToAdmin(id, isAdmin);
        if (isWorkerEdited)
            return Ok();
        return BadRequest();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteWorker(int id)
    {
        bool isWorkerDeleted = workerService.DeleteWorker(id);
        if (isWorkerDeleted)
            return Ok();
        return NotFound();
    }
}