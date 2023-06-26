using System.ComponentModel.DataAnnotations;

namespace SerwisKomputerowy.Backend.Entities;

//TODO: Napisać rodzaje napraw
public enum RepairType
{
    Zwykla,
    Niezwykla
}

//TODO: Napisać statusy naprawy
// Pamietac ze na frontendzie tez to jest repairRow.js
public enum Status
{
    Skonoczone,
    Przyjete
}

public class Repair :IEntity
{
    [Key] public int Id { get; set; }
    public RepairType Type { get; set; }
    public bool IsGuarantee { get; set; }
    public DateTime GuaranteeTime { get; set; }
    public DateTime AcceptanceTime { get; set; }
    public DateTime ReturnTime { get; set; }
    public Status Status { get; set; }
    public Client? Client { get; set; }
    public IEnumerable<Message>? Messages { get; set; }
    public IEnumerable<Part>? Parts { get; set; }
    public Equipment? Equipment { get; set; }
    public IEnumerable<Action>? Actions { get; set; }

    public Repair Update(Repair repair)
    {
        this.Type = repair.Type;
        this.IsGuarantee = repair.IsGuarantee;
        this.GuaranteeTime = repair.GuaranteeTime;
        this.AcceptanceTime = repair.AcceptanceTime;
        this.ReturnTime = repair.ReturnTime;
        this.Status = repair.Status;
        return this;
    }
}