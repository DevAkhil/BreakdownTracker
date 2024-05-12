using AutoMapper;
using BreakdownTracker.Application.DTOs.Breakdown;
using BreakdownTracker.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BreakdownTracker.Application.Mapping
{
    public class BreakdownProile:Profile
    {
        public BreakdownProile()
        {
            CreateMap<Breakdown, GetBreakdownDTO>();
            CreateMap<CreateBreakdownDTO, Breakdown>();
            CreateMap<UpdateBreakdownDTO, Breakdown>();
        }


    }
}
