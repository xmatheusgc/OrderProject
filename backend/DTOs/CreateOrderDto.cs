using System.ComponentModel.DataAnnotations;

namespace OrderApi.DTOs
{
    public class CreateOrderDto
    {
        [Required]
        public string CustomerName { get; set; } = string.Empty;

        [Range(0.01, double.MaxValue)]
        public decimal Value { get; set; }

        public DateTime OrderDate { get; set; }
    }
}
