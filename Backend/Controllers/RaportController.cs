using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Repositories;
using SerwisKomputerowy.Backend.Services;
using SerwisKomputerowy.Backend.DB;

namespace SerwisKomputerowy.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class RaportController : ControllerBase
{
    public DatabaseContext dbContext;

    [HttpGet]
    public IActionResult GetReport(
    [FromQuery(Name = "startDate")] DateTime startDate,
    [FromQuery(Name = "endDate")] DateTime endDate,
    [FromQuery(Name = "workerID")] int workerID = -1,
    [FromQuery(Name = "repairID")] int repairID = -1,
    [FromQuery(Name = "clientID")] int clientID = -1)
    {

        IQueryable<Backend.Entities.Action> repairQuery = dbContext.Actions;


        // Dodaj warunek na daty początkową i końcową
        repairQuery = repairQuery.Where(r => r.Repair.ReturnTime >= startDate && r.Repair.ReturnTime <= endDate);

        // Dodaj warunek na numer pracownika
        if (workerID != -1)
        {
            repairQuery = repairQuery.Where(r => r.Worker.Id == workerID);
        }

        // Dodaj warunek na numer naprawy
        if (repairID != -1)
        {
            repairQuery = repairQuery.Where(r => r.Repair.Id == repairID);
        }

        // Dodaj warunek na numer klienta
        if (clientID != -1)
        {
            repairQuery = repairQuery.Where(r => r.Repair.Client.Id== clientID);
        }

        List<Backend.Entities.Action> reportData = repairQuery.ToList();

        return Ok(reportData);
    }
}