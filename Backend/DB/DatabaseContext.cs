using Microsoft.EntityFrameworkCore;
using SerwisKomputerowy.Backend.Entities;
using Action = SerwisKomputerowy.Backend.Entities.Action;

namespace SerwisKomputerowy.Backend.DB;

public class DatabaseContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Worker> Workers { get; set; }
    public DbSet<Message> Messages { get; set; }
    public DbSet<Client>  Clients { get; set; }
    public DbSet<Repair> Repairs { get; set; }
    public DbSet<Equipment> Equipments { get; set; }
    public DbSet<Action> Actions { get; set; }

    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }
}