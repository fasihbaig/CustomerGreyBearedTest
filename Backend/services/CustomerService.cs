using CustomerTest.Contexts;
using CustomerTest.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace CustomerTest.services
{
    public class CustomerService
    {
        private CustomerDbContext _dbContext;
        public CustomerService(CustomerDbContext db) {
            this._dbContext = db;
        }
        async public Task<List<Customer>> GetAllCustomers()
        {
            return await this._dbContext.Customers.ToListAsync();
        }

        public async Task<Customer> Create(Customer customer)
        {
            var result = await this._dbContext.Customers.AddAsync(customer);
            this._dbContext.SaveChanges();
            return result.Entity;
        }

        public async void Delete(int customerId)
        {
            var customer = await this._dbContext.Customers.FindAsync(customerId);
            if(customer == null)
            {
                throw new Exception("Customer not found");
            }
            this._dbContext.Remove(customer);
            this._dbContext.SaveChanges();
        }
    }
}
