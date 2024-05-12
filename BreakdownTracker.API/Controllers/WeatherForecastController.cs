using BreakdownTracker.Domain.Repositories;
using BreakdownTracker.Infrastructure.Context;
using BreakdownTracker.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace BreakdownTracker.API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly IBreakdownRepository _breakdownRepository;
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, IBreakdownRepository breakdownRepository)
        {
            _logger = logger;
            _breakdownRepository = breakdownRepository;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public async Task<IEnumerable<WeatherForecast>> Get()
        {

         Breakdown  x =  await _breakdownRepository.CreateAsync(new Breakdown()
            {
                BreakdownDate = DateTime.Now,
                CompanyName = "Test",
                DriverName = "Test Al",
                RegistrationNumber = "NX 7777",
               

            });

          await  _breakdownRepository.CreateAsync(new Breakdown()
            {
                BreakdownDate = DateTime.Now,
                CompanyName = "Test",
                DriverName = "Test Al",
                RegistrationNumber = "NX 888",


            });

           var get = await _breakdownRepository.GetAllAsync();

            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();
        }
    }
}
