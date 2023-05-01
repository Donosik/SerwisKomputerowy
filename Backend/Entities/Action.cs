using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SerwisKomputerowy.Backend.Entities;

public class Action
{
    [Key]
    public int Id { get; set; }
    public String Description { get; set; }
    public Repair Repair { get; set; }
    public Worker Worker { get; set; }
}