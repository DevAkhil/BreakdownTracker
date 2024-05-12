
using BreakdownTracker.Application;
using BreakdownTracker.Domain.Repositories;
using BreakdownTracker.Infrastructure.Context;
using BreakdownTracker.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BreakdownTrackerContext>(options =>
     options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
       b => b.MigrationsAssembly("BreakdownTracker.Infrastructure")));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyLocalhost",
        builder =>
        {
            builder
                .AllowAnyOrigin() // Allow requests from any origin
                .AllowAnyMethod() // Allow any HTTP method
                .AllowAnyHeader(); // Allow any header
        });
});

builder.Services.AddScoped<IBreakdownRepository, BreakdownRepository>();
builder.Services.AddApplicationServices();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors("AllowAnyLocalhost");
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
