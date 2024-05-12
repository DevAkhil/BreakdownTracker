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
    public class CreateBreakdownUseCase
    {
        private readonly IMapper _mappper;
        private readonly IBreakdownRepository _breakdownRepository;

        public CreateBreakdownUseCase(IMapper mappper, IBreakdownRepository breakdownRepository)
        {
            _mappper = mappper;
            _breakdownRepository = breakdownRepository;
        }

       public async Task<GetBreakdownDTO> Execute(CreateBreakdownDTO createBreakdownDTO)
        {

           Domain.Entities.Breakdown createObj = _mappper.Map<Domain.Entities.Breakdown>(createBreakdownDTO);
           createObj = await _breakdownRepository.CreateAsync(createObj);
            return _mappper.Map<GetBreakdownDTO>(createObj);
        }

    }
}
