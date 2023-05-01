using System.ComponentModel.DataAnnotations;

namespace SerwisKomputerowy.Backend.Entities;

public class Part
{
    [Key]
    public int SerialNumber { get; set; }
    public string PartName { get; set; }    
    public int Cost { get; set; }
    public bool IsUsed { get; set; }
    public int CostOfWork { get; set; }
    public Repair Repair { get; set; }
}