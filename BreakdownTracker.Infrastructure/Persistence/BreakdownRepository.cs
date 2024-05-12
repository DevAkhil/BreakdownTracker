using BreakdownTracker.Domain.Repositories;
using BreakdownTracker.Infrastructure.Context;
using BreakdownTracker.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BreakdownTracker.Infrastructure.Persistence
{
    public class BreakdownRepository : IBreakdownRepository
    {
        private readonly BreakdownTrackerContext _breakdownTrackerContext;

        public BreakdownRepository(BreakdownTrackerContext breakdownTrackerContext)
        {
            _breakdownTrackerContext = breakdownTrackerContext;
        }

        public async Task<List<Breakdown>> GetAllAsync()
        {
            return await _breakdownTrackerContext.Breakdown.ToListAsync();
        }

        public async Task<Breakdown?> GetByBreakdownReference(string breakdownReference)
        {
            return await _breakdownTrackerContext.Breakdown.FirstOrDefaultAsync(x => x.BreakdownReference == breakdownReference); ;
        }
        public async Task<Breakdown> CreateAsync(Breakdown breakdown)
        {
            await _breakdownTrackerContext.AddAsync(breakdown);
            await _breakdownTrackerContext.SaveChangesAsync();
            return breakdown;
        }



        public async Task<Breakdown> UpdateAsync(Breakdown breakdown)
        {
            _breakdownTrackerContext.Update(breakdown);
            await _breakdownTrackerContext.SaveChangesAsync();
            return breakdown;
        }
    }
}
