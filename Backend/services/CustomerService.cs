using CustomerTest.Contexts;
using CustomerTest.DTOs.Customer;
using CustomerTest.Exceptions;
using CustomerTest.Models;
using Microsoft.AspNetCore.Http.HttpResults;
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
            await this._dbContext.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<Customer> Update(Guid id, UpdateCustomerDTO customer)
        {
            var existingCustomer = await this._dbContext.Customers.FindAsync(id);
            if (existingCustomer == null )
            {
                throw new NotFoundException("Unable to find customer with id");
            }
            if(!string.IsNullOrEmpty(customer.name))
            {
                existingCustomer.Name = customer.name;
            }

            if (!string.IsNullOrEmpty(customer.email))
            {
                existingCustomer.Email = customer.email;
            }

            if (!string.IsNullOrEmpty(customer.phoneNumber))
            {
                existingCustomer.PhoneNumber = customer.phoneNumber;
            }
            await this._dbContext.SaveChangesAsync();
            return existingCustomer;
        }

        public async Task<int> Delete(Guid id)
        {
            var customer = await this._dbContext.Customers.FindAsync(id);
            if(customer == null)
            {
                throw new NotFoundException("Customer not found");
            }
            this._dbContext.Remove(customer);
            return await this._dbContext.SaveChangesAsync();
        }
    }
}
