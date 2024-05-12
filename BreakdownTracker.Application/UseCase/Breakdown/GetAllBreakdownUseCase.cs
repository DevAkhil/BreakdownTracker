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
    public class GetAllBreakdownUseCase
    {
        private readonly IMapper _mapper;
        private readonly IBreakdownRepository _breakdownRepository;

        public GetAllBreakdownUseCase(IMapper mapper, IBreakdownRepository breakdownRepository)
        {
            _mapper = mapper;
            _breakdownRepository = breakdownRepository;
        }

        public async Task<List<GetBreakdownDTO>> Execute()
        {
            List<Domain.Entities.Breakdown> breakdowns = await _breakdownRepository.GetAllAsync();
            return _mapper.Map<List<GetBreakdownDTO>>(breakdowns);   
        }

    }
}
