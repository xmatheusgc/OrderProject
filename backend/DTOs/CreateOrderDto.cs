using System.ComponentModel.DataAnnotations;

namespace OrderApi.DTOs
{
    public class CreateOrderDto
    {
        [Required(ErrorMessage = "Customer name is required.")]
        public string CustomerName { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue, ErrorMessage = "Value must be greater than zero.")]
        public decimal Value { get; set; }

        public DateTime OrderDate { get; set; }
    }
}
