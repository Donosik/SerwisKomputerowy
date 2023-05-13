using System.ComponentModel.DataAnnotations;

namespace SerwisKomputerowy.Backend.Entities;

//TODO: Napisać rodzaje napraw
public enum RepairType
{
    Zwykla,
    Niezwykla
}

//TODO: Napisać statusy naprawy
public enum Status
{
    Skonoczone,
    Przyjete
}

public class Repair
{
    [Key] public int Id { get; set; }
    public RepairType Type { get; set; }
    public bool IsGuarantee { get; set; }
    public DateTime GuaranteeTime { get; set; }
    public DateTime AcceptanceTime { get; set; }
    public DateTime ReturnTime { get; set; }
    public Status Status { get; set; }
    public Client? Client { get; set; }
    public List<Message> Messages { get; set; }
    public List<Part> Parts { get; set; }
    public Equipment Equipment { get; set; }
    public List<Action> Actions { get; set; }

    public Repair Update(Repair repair)
    {
        this.Type = repair.Type;
        this.IsGuarantee = repair.IsGuarantee;
        this.AcceptanceTime = repair.AcceptanceTime;
        this.ReturnTime = repair.ReturnTime;
        this.Status = repair.Status;
        this.Client = repair.Client;
        this.Messages = repair.Messages;
        this.Parts = repair.Parts;
        this.Equipment = repair.Equipment;
        this.Actions = repair.Actions;
        return this;
    }
}