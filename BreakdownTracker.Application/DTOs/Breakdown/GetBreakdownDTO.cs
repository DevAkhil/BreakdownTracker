using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BreakdownTracker.Application.DTOs.Breakdown
{
    public class GetBreakdownDTO
    {
        public string BreakdownReference { get; set; } = null!;
        public string CompanyName { get; set; } = null!;

        public string DriverName { get; set; } = null!;

        public string RegistrationNumber { get; set; } = null!;

        public DateTime BreakdownDate { get; set; } 
    }
}
