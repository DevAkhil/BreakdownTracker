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
    public class UpdateBreakdownUseCase
    {
        private readonly IMapper _mappper;
        private readonly IBreakdownRepository _breakdownRepository;

        public UpdateBreakdownUseCase(IMapper mappper, IBreakdownRepository breakdownRepository)
        {
            _mappper = mappper;
            _breakdownRepository = breakdownRepository;
        }

       public async Task<GetBreakdownDTO?> Execute(string breakdownReference, UpdateBreakdownDTO updateBreakdownDTO)
        {
            Domain.Entities.Breakdown? oldBreakdownObj = await _breakdownRepository.GetByBreakdownReference(breakdownReference);
            if(oldBreakdownObj is null)
            {
                return null;
            }
            Domain.Entities.Breakdown updateBreakdownObj = _mappper.Map(updateBreakdownDTO, oldBreakdownObj);
            updateBreakdownObj = await _breakdownRepository.UpdateAsync(updateBreakdownObj);
            return _mappper.Map<GetBreakdownDTO>(updateBreakdownObj);
        }

    }
}
