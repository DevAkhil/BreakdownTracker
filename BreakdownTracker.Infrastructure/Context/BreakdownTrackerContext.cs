using BreakdownTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BreakdownTracker.Infrastructure.Context
{
    public class BreakdownTrackerContext:DbContext
    {
        public BreakdownTrackerContext(DbContextOptions<BreakdownTrackerContext> options)
       : base(options)
        {
        }
        public DbSet<Breakdown> Breakdown { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Breakdown>().HasData(
                new Breakdown { BreakdownReference = "RNR-13-05-2024-4567890", CompanyName = "Right Now Response", DriverName = "Llewellyn Crosby", RegistrationNumber = "ND50128", BreakdownDate = new DateTime(2024, 5, 8, 8, 0, 0) },
                new Breakdown { BreakdownReference = "RNR-13-05-2024-8901234", CompanyName = "Right Now Response", DriverName = "Akhil Ishwarlaal", RegistrationNumber = "NX52843", BreakdownDate = new DateTime(2024, 5, 12, 10, 0, 0) },
                new Breakdown { BreakdownReference = "RNR-13-05-2024-0123456", CompanyName = "ABC Transport", DriverName = "John Smith", RegistrationNumber = "ABC123", BreakdownDate = new DateTime(2024, 5, 13, 8, 0, 0) }

            );
        }
    }
}
