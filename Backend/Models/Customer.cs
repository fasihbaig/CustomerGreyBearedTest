namespace CustomerTest.Models
{
    public class Customer
    {
        public Guid ID {  get; set; }

        public required string Name { get; set; }

        public required string Email { get; set; }

        public string? PhoneNumber { get; set; }

        public required DateTime CreatedAt { get; set; }

    }
}
