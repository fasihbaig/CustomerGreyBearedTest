namespace CustomerTest.Models
{
    public class Customer
    {
        public int ID {  get; set; }

        public required string Name { get; set; }

        public required string Email { get; set; }

        public required DateTime CreatedAt { get; set; }
    }
}
