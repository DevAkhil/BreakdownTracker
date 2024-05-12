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
    }
}
