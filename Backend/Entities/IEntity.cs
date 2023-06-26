using System.ComponentModel.DataAnnotations;

namespace SerwisKomputerowy.Backend.Entities;

public interface IEntity
{
    [Key]
    int Id { get; set; }
}