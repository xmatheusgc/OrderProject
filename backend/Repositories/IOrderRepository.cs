using OrderApi.Models;

namespace OrderApi.Repositories
{
    public interface IOrderRepository
    {
        Task<List<Order>> GetAllAsync();

        Task<Order?> GetByIdAsync(Guid id);

        Task AddAsync(Order order);
    }
}
