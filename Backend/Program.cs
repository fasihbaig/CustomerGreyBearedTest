using CustomerTest.Contexts;
using CustomerTest.services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CustomerDbContext>(opt => opt.UseInMemoryDatabase("CustomersDB"));
builder.Services.AddApplicationInsightsTelemetry();

ConfigureServices.setupServices(builder.Services);

var corsPolicy = "AllowAll";

builder.Services.AddCors(
    options => 
        options.AddPolicy(
            corsPolicy, 
            policy => 
                policy
                    .AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                   )
        );

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(corsPolicy);

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
