using BreakdownTracker.Application.DTOs.Breakdown;
using BreakdownTracker.Application.UseCase.Breakdown;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BreakdownTracker.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BreakdownController : ControllerBase
    {
        private readonly GetBreakdownUseCase _getBreakdownUseCase;
        private readonly GetAllBreakdownUseCase _getAllBreakdownUseCase;
        private readonly CreateBreakdownUseCase _createBreakdownUseCase;
        private readonly UpdateBreakdownUseCase _updateBreakdownUseCase;

        public BreakdownController(GetBreakdownUseCase getBreakdownUseCase, GetAllBreakdownUseCase getAllBreakdownUseCase, CreateBreakdownUseCase createBreakdownUseCase, UpdateBreakdownUseCase updateBreakdownUseCase)
        {
            _getBreakdownUseCase = getBreakdownUseCase;
            _getAllBreakdownUseCase = getAllBreakdownUseCase;
            _createBreakdownUseCase = createBreakdownUseCase;
            _updateBreakdownUseCase = updateBreakdownUseCase;
        }



        // GET: api/<BreakdownController>
        [HttpGet]
        public async Task<ActionResult<List<GetBreakdownDTO>>> Get()
        {
            List<GetBreakdownDTO> outputList = await _getAllBreakdownUseCase.Execute();
            return Ok(outputList);
        }

        // GET api/<BreakdownController>/BD-11-05-2024-5041394
        [HttpGet("{bookingReference}")]
        public async Task<ActionResult<GetBreakdownDTO>> Get(string bookingReference)
        {
           GetBreakdownDTO? output = await _getBreakdownUseCase.Execute(bookingReference);
           if(output == null) 
            {
                return NotFound(new { Message = "Breakdown not found." });
            }
           return Ok(output);
        }

        // POST api/<BreakdownController>
        [HttpPost]
        public async Task<GetBreakdownDTO> Post([FromBody] CreateBreakdownDTO createBreakdownDTO)
        {
            return await _createBreakdownUseCase.Execute(createBreakdownDTO);
        }

        // PUT api/<BreakdownController>/BD-11-05-2024-5041394
        [HttpPut("{bookingReference}")]
        public async Task<ActionResult<GetBreakdownDTO>> Put(string bookingReference, [FromBody] UpdateBreakdownDTO updateBreakdownDTO)
        {
            GetBreakdownDTO? output = await _updateBreakdownUseCase.Execute(bookingReference, updateBreakdownDTO);
            if(output is null)
            {
                return NotFound(new { Message = "Breakdown not found." });
            }
            return output;

        }

    }
}
