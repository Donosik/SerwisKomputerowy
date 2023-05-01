using System.ComponentModel.DataAnnotations;

namespace SerwisKomputerowy.Backend.Entities;

public class Equipment
{
    [Key] public int Id { get; set; }
    public String Type { get; set; }
    public String Name { get; set; }
    public DateTime ProductionDate { get; set; }
    public List<Repair> Repairs { get; set; }
}