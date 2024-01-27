using CustomerTest.Contexts;
using CustomerTest.DTOs.Customer;
using CustomerTest.Exceptions;
using CustomerTest.Models;
using CustomerTest.services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;

namespace CustomerTest.Controllers
{
    [ApiController]
    [Route("api/customers")]
    public class CustomerController : ControllerBase
    {

        private readonly ILogger<CustomerController> _logger;

        private readonly CustomerDbContext db;

        private readonly CustomerService customerService;

        //constructure
        public CustomerController(
            ILogger<CustomerController> logger, 
            CustomerDbContext db,
            CustomerService customerService
            )
        {
            _logger = logger;
            this.db = db;
            this.customerService = customerService;
        }

        [HttpGet]
        [Route("all")]
        public async Task<IResult> All()
        {
            var customers = await this.customerService.GetAllCustomers();
            return TypedResults.Ok(customers);
        }

        [HttpPost]
        [Route("add")]
        public async Task<IActionResult> Add(CreateCustomerDTO customerDTO)
        {
            try
            {
                var result = await this.customerService.Create(
                new Customer
                {
                    ID = new Guid(),
                    CreatedAt = new DateTime(),
                    Name = customerDTO.name,
                    Email = customerDTO.email,
                    PhoneNumber = customerDTO.phoneNumber,

                });

                return CreatedAtRoute(new { id = result.ID }, result);
            } catch (Exception ex)
            {
                return StatusCode(500, ex);
            } 
        }

        [HttpPut]
        [Route("update/{id}")]
        public async Task<IActionResult> Update(string id, UpdateCustomerDTO customerDTO)
        {
            try
            {
                var result = await this.customerService.Update(Guid.Parse(id), customerDTO);

                return CreatedAtRoute(new { id = result.ID }, result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                if(ex is NotFoundException) { 
                    return StatusCode(404, ex.Message);
                }
                return StatusCode(500, ex.Message);
            }
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public async Task<IResult> Delete(string id)
        {
            try
            {
                 await this.customerService.Delete(Guid.Parse(id));
                return TypedResults.Ok(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex.Message);
                if (ex is NotFoundException)
                {
                    return (IResult)StatusCode(404, ex.Message);
                }
                return (IResult)StatusCode(500, ex.Message);
            }
        }
    }
}
