using System.ComponentModel.DataAnnotations;

namespace SerwisKomputerowy.Backend.Entities;

public class Client : IEntity
{
    [Key] public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public User? User { get; set; }
    public List<Repair>? Repairs { get; set; }

    public Client Update(Client client)
    {
        this.FirstName = client.FirstName;
        this.LastName = client.LastName;
        return this;
    }
}