using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BreakdownTracker.Domain.Entities
{
    public class Breakdown
    {
        public Breakdown()
        {
            BreakdownReference = GenerateBreakdownReference();
        }

        [Key]
        [StringLength(50)]
        [Required]
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public string BreakdownReference { get; set; } = null!;
        [StringLength(100)]
        [Required]
        public string CompanyName { get; set; } = null!;
        [StringLength(100)]
        [Required]
        public string DriverName { get; set; } = null!;
        [StringLength(50)]
        [Required]
        public string RegistrationNumber { get; set; } = null!;
        [Required]
        public DateTime BreakdownDate { get; set; } 

        public string GenerateBreakdownReference()
        {
            return $"RNR-{DateTime.Now:dd-MM-yyyy}-{GenerateRandomDigits()}";
        }

        private string GenerateRandomDigits()
        {
            Random random = new Random();
            return random.Next(1000000, 9999999).ToString();
        }



    }
}
