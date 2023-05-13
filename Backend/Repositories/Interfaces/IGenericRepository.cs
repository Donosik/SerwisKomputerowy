namespace SerwisKomputerowy.Backend.Repositories;

public interface IGenericRepository<T> where T : class
{
    IEnumerable<T> GetAll();
    T Get(int id);
    bool Create(T entity);
    bool Update(T entity);
    bool Delete(T entity);
}