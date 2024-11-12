using HCMS.Application.Features.Benefit.Command;
using HCMS.Application.Features.Benefit.Model;
using HCMS.Application.Features.Benefit.Queries;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Reflection.Metadata.Ecma335;

namespace HCMS.API.Controllers.Benefit
{

    [Route("Api/[controller]")]
    [ApiController]
    public class BenefitController : BaseController<BenefitController>
    {

        [HttpPost("CreateBenefit", Name = "CreateBenefit")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<int>> CreateBenefit([FromBody] CreateBenefitCommand command)
        {
            try
            {
                var AddedID = await mediator.Send(command);
                return Ok(AddedID);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server Error");
            }

        }
        [HttpGet("GetAllBenefit",Name ="GetAllBenefit")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<BenefitDto>>GetAllBenefit()
        {

            try
            {
                var allBenefit = await mediator.Send(new GetBenefitQuery());
                if (allBenefit == null)
                {
                    return NotFound();
                }

                return Ok(allBenefit);
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server Error");
            }
        }
       
        [HttpGet("GetBenefitById", Name = "GetBenefitById")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<BenefitDto>> GetBenefitById(int id)
        {
            try
            {
                var Benefit = await mediator.Send(new GetBenefitByIdQuery(id));
                if(Benefit != null)
                {
                    return Ok(Benefit);
                }
                return NotFound();
            }
            catch(Exception ex)
            {
                return StatusCode(500, "Internal server");
            }
        }
        [HttpPut("UpdateBenefit",Name ="Update Benefit")]
       [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<int>> UpdateBenfit([FromBody]UpdateBenefitCommand command)
        {
            try
            {
                var AddedID = await mediator.Send(command);
                return Ok(AddedID);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server Error");
            }
        }
    }
}
