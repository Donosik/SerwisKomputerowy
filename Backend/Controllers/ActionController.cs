using System.Collections;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SerwisKomputerowy.Backend.Services;
using Action = SerwisKomputerowy.Backend.Entities.Action;

namespace SerwisKomputerowy.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class ActionController : ControllerBase
{
    public readonly IActionService actionService;

    public ActionController(IActionService actionService)
    {
        this.actionService = actionService;
    }

    [HttpGet]
    public IActionResult GetActions()
    {
        IEnumerable<Action> actions = actionService.GetActions();
        if (actions != null)
            return Ok(actions);
        return NotFound();
    }

    [HttpGet("{id}")]
    public IActionResult GetAction(int id)
    {
        Action action = actionService.GetAction(id);
        if (action != null)
            return Ok(action);
        return NotFound();
    }

    [HttpPost]
    public IActionResult CreateAction(Action action)
    {
        bool isActionCreated = actionService.CreateAction(action);
        if (isActionCreated)
            return Ok(action.Id);
        return BadRequest();
    }

    [HttpPut("{actionId}/{repairId}/{workerId}")]
    public IActionResult EditActionWithIds(int actionId, int repairId, int workerId)
    {
        bool isActionEdited = actionService.EditActionWithIds(actionId, repairId, workerId);
        if (isActionEdited)
            return Ok();
        return BadRequest();
    }

    [HttpPut]
    public IActionResult EditAction(Action action)
    {
        bool isActionEdited = actionService.EditAction(action);
        if (isActionEdited)
            return Ok();
        return BadRequest();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteAction(int id)
    {
        bool isActionDeleted = actionService.DeleteAction(id);
        if (isActionDeleted)
            return Ok();
        return NotFound();
    }
}