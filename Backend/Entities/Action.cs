using System.ComponentModel.DataAnnotations;

namespace SerwisKomputerowy.Backend.Entities;

public class Action : IEntity
{
    [Key] public int Id { get; set; }
    public String Description { get; set; }
    public Repair? Repair { get; set; }
    public Worker? Worker { get; set; }

    public Action Update(Action action)
    {
        this.Description = action.Description;
        return this;
    }
}