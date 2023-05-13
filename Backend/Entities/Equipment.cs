using System.ComponentModel.DataAnnotations;

namespace SerwisKomputerowy.Backend.Entities;

public class Equipment
{
    [Key] public int Id { get; set; }
    public String Type { get; set; }
    public String Name { get; set; }
    public DateTime ProductionDate { get; set; }
    public List<Repair> Repairs { get; set; }

    public Equipment Update(Equipment equipment)
    {
        this.Type = equipment.Type;
        this.Name = equipment.Name;
        this.ProductionDate = equipment.ProductionDate;
        this.Repairs = equipment.Repairs;
        return this;
    }
}