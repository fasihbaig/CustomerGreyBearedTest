namespace CustomerTest.services
{
    public class ConfigureServices
    {

        public static void setupServices(IServiceCollection services)
        {
            services.AddScoped<CustomerService>();
        }
    }
}
