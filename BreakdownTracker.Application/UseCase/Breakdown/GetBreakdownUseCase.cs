using AutoMapper;
using BreakdownTracker.Application.DTOs.Breakdown;
using BreakdownTracker.Domain.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BreakdownTracker.Application.UseCase.Breakdown
{
    public class GetBreakdownUseCase
    {

        private readonly IMapper _mapper;
        private readonly IBreakdownRepository _breakdownRepository;

        public GetBreakdownUseCase(IMapper mapper, IBreakdownRepository breakdownRepository)
        {
            _mapper = mapper;
            _breakdownRepository = breakdownRepository;
        }

        public async Task<GetBreakdownDTO?> Execute(string breakdownReference)
        {
            Domain.Entities.Breakdown? breakdown = await _breakdownRepository.GetByBreakdownReference(breakdownReference);
            if(breakdown is null) { return null; }
            GetBreakdownDTO test =  _mapper.Map<GetBreakdownDTO>(breakdown);
            return test;
        }
    }
}
