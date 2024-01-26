using CustomerTest.Models;
using Microsoft.EntityFrameworkCore;

namespace CustomerTest.Contexts
{
    public class CustomerDbContext : DbContext
    {
        public CustomerDbContext( DbContextOptions<CustomerDbContext> options ) : base(options)
        {}

        public DbSet<Customer> Customers => Set<Customer>();
    }
}
