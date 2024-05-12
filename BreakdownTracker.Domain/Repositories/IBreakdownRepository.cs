
using BreakdownTracker.Domain.Entities;
using System.Threading.Tasks;

namespace BreakdownTracker.Domain.Repositories
{
    public interface IBreakdownRepository
    {
        Task<List<Breakdown>> GetAllAsync();
        Task<Breakdown?> GetByBreakdownReference(string breakdownReference);
        Task<Breakdown> CreateAsync(Breakdown breakdown);
        Task<Breakdown> UpdateAsync(Breakdown breakdown);

    }
}
