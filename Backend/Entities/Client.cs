using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SerwisKomputerowy.Backend.Entities;

public class Client
{
    [Key]
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public User User { get; set; }
    public List<Repair> Repairs { get; set; }
}