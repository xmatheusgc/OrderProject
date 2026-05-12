namespace OrderApi.Models
{
    public class Order
    {
        public Guid Id { get; set; } = Guid.NewGuid();

        public string CustomerName { get; set; } = string.Empty;

        public decimal Value { get; set; }

        public DateTime OrderDate { get; set; }
    }
}
