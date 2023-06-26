using System.ComponentModel.DataAnnotations;

namespace SerwisKomputerowy.Backend.Entities;

public class Message : IEntity
{
    [Key] public int Id { get; set; }
    public String Content { get; set; }
    public DateTime Date { get; set; }
    public User? User { get; set; }
    public Repair? Repair { get; set; }

    public Message Update(Message message)
    {
        this.Content = message.Content;
        this.Date = message.Date;
        return this;
    }
}