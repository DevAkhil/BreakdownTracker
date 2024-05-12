using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BreakdownTracker.Application.DTOs.Breakdown
{
    public class CreateBreakdownDTO
    {
        [StringLength(100)]
        [Required(ErrorMessage = "Company name is required.")]
        [Display(Name = "Company Name")]
        public string CompanyName { get; set; } = null!;

        [StringLength(100)]
        [Required(ErrorMessage = "Driver name is required.")]
        [Display(Name = "Driver Name")]
        public string DriverName { get; set; } = null!;

        [StringLength(50)]
        [Required(ErrorMessage = "Registration number is required.")]
        [Display(Name = "Registration Number")]
        public string RegistrationNumber { get; set; } = null!;

        [Required(ErrorMessage = "Breakdown date is required.")]
        [Display(Name = "Breakdown Date")]
        public DateTime BreakdownDate { get; set; }
    }
}
