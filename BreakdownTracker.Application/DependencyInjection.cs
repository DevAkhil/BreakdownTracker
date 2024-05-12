using BreakdownTracker.Application.UseCase.Breakdown;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace BreakdownTracker.Application
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());
            services.AddScoped<GetBreakdownUseCase>();
            services.AddScoped<GetAllBreakdownUseCase>();
            services.AddScoped<CreateBreakdownUseCase>();
            services.AddScoped<UpdateBreakdownUseCase>();
            return services;
        }
    }
}
