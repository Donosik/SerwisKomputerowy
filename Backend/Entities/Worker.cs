using System.ComponentModel.DataAnnotations;

namespace SerwisKomputerowy.Backend.Entities;

public enum Specialization
{
    Elektronik,
    Drukarki,
    AGD,
    Telefony,
    Oprogramowanie,
    SieciKomputerowe,
    OdzyskiwanieDanych
}

public class Worker : IEntity
{
    [Key] public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public DateTime BirthDate { get; set; }
    public Specialization Specialization { get; set; }
    public User? User { get; set; }
    public List<Action>? Actions { get; set; }

    public Worker Update(Worker worker)
    {
        this.FirstName = worker.FirstName;
        this.LastName = worker.LastName;
        this.BirthDate = worker.BirthDate;
        this.Specialization = worker.Specialization;
        return this;
    }
}