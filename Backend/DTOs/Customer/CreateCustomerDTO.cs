namespace CustomerTest.DTOs.Customer
{
    public class CreateCustomerDTO
    {
        public required string name { get; set; }
        public required string email { get; set; }
        public required string phoneNumber { get; set; }
    }
}
