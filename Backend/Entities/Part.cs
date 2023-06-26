using System.ComponentModel.DataAnnotations;

namespace SerwisKomputerowy.Backend.Entities;

public class Part : IEntity
{
    [Key]
    public int Id { get; set; }
    public int SerialNumber { get; set; }
    public string PartName { get; set; }
    public int Cost { get; set; }
    public bool IsUsed { get; set; }
    public int CostOfWork { get; set; }
    public Repair? Repair { get; set; }

    public Part Update(Part part)
    {
        this.SerialNumber = part.SerialNumber;
        this.PartName = part.PartName;
        this.Cost = part.Cost;
        this.IsUsed = part.IsUsed;
        this.CostOfWork = part.CostOfWork;
        return this;
    }
}