using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SerwisKomputerowy.Backend.Entities;
using SerwisKomputerowy.Backend.Services;

namespace SerwisKomputerowy.Controllers;

[Authorize]
[ApiController]
[Route("[controller]")]
public class MessageController : ControllerBase
{
    public IMessageService messageService;

    public MessageController(IMessageService messageService)
    {
        this.messageService = messageService;
    }

    [HttpGet]
    public IActionResult GetMessages()
    {
        IEnumerable<Message> messages = messageService.GetMessages();
        if (messages != null)
            return Ok(messages);
        return NotFound();
    }

    [HttpGet("{id}")]
    public IActionResult GetMessage(int id)
    {
        Message message = messageService.GetMessage(id);
        if (message != null)
            return Ok(message);
        return NotFound();
    }

    [HttpPost]
    public IActionResult CreateMessage(Message message)
    {
        bool isMessageCreated = messageService.CreateMessage(message);
        if (isMessageCreated)
            return Ok();
        return BadRequest();
    }

    [HttpPut]
    public IActionResult EditMessage(Message message)
    {
        bool isMessageEdited = messageService.EditMessage(message);
        if (isMessageEdited)
            return Ok();
        return BadRequest();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteMessage(int id)
    {
        bool isMessageDeleted = messageService.DeleteMessage(id);
        if (isMessageDeleted)
            return Ok();
        return NotFound();;
    }
}