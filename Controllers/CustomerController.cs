using CustomerTest.Contexts;
using CustomerTest.Models;
using CustomerTest.services;
using Microsoft.AspNetCore.Mvc;

namespace CustomerTest.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
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

        [HttpGet(Name = "/customers")]
        public async Task<IResult> All()
        {
            var customers = await this.customerService.GetAllCustomers();
            return TypedResults.Ok(customers);
        }

        [HttpPost(Name = "/customers")]
        public async Task<IActionResult> Post()
        {
            try
            {
                var result = await this.customerService.Create(
                new Customer
                {
                    ID = new Random().Next(1, 999999999),
                    CreatedAt = new DateTime(),
                    Name = "dfsdf",
                    Email = "fas@gm.com"

                });

                return CreatedAtRoute(new { id = result.ID }, result);
            } catch (Exception ex)
            {
                return StatusCode(500, "Unable to create new customer");
            }
            
        }
    }
}
