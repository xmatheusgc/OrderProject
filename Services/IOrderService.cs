using OrderApi.DTOs;

namespace OrderApi.Services
{
    public interface IOrderService
    {
        Task<List<OrderResponseDto>> GetAllAsync();

        Task<OrderResponseDto?> GetByIdAsync(Guid id);

        Task<OrderResponseDto> CreateAsync(CreateOrderDto dto);
    }
}
