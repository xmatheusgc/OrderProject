using OrderApi.DTOs;
using OrderApi.Models;
using OrderApi.Repositories;

namespace OrderApi.Services
{
    public class OrderService : IOrderService
    {
        private readonly IOrderRepository _repository;

        public OrderService(IOrderRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<OrderResponseDto>> GetAllAsync()
        {
            var orders = await _repository.GetAllAsync();

            return orders.Select(order => new OrderResponseDto
            {
                Id = order.Id,
                CustomerName = order.CustomerName,
                Value = order.Value,
                OrderDate = order.OrderDate
            }).ToList();
        }

        public async Task<OrderResponseDto?> GetByIdAsync(Guid id)
        {
            var order = await _repository.GetByIdAsync(id);

            if (order == null)
                return null;

            return new OrderResponseDto
            {
                Id = order.Id,
                CustomerName = order.CustomerName,
                Value = order.Value,
                OrderDate = order.OrderDate
            };
        }

        public async Task<OrderResponseDto> CreateAsync(CreateOrderDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.CustomerName))
                throw new Exception("Customer name is required.");

            if (dto.Value <= 0)
                throw new Exception("Value must be greater than zero.");

            var order = new Order
            {
                CustomerName = dto.CustomerName,
                Value = dto.Value,
                OrderDate = dto.OrderDate
            };

            await _repository.AddAsync(order);

            return new OrderResponseDto
            {
                Id = order.Id,
                CustomerName = order.CustomerName,
                Value = order.Value,
                OrderDate = order.OrderDate
            };
        }
    }
}
