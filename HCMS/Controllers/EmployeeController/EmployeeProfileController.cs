
using HCMS.Application.Features;
using HCMS.Application.Features.Employees;
using HCMS.Application.Features.Employees.Queries;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;

namespace HCMS.API.Controllers.EmployeeController
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeProfileController : BaseController<EmployeeProfileController>
    {

        [HttpPost("add", Name="CreateEmployeeProfile")]
        [ProducesResponseType(200)]
        
        public async Task<ActionResult<int>> CreateEmployeeProfile([FromBody]CreateEmployeeProfileCommand employeeProfile)
        {
            var employeeId = await mediator.Send(employeeProfile);
            return Ok(employeeId);
        }
        [HttpGet("all", Name = "GetAllEmployees")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<EmployeeDto>>> GetAllEmployees()
        {
            var searchResult = await mediator.Send(new GetEmployeeListQuery());
            return searchResult;
        }
        [HttpPost("Update",Name="UpdateEmployeeProfile")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> UpdateEmployeeProfile([FromBody]UpdateEmployeeProfileCommand updateEmployee)
        {
            if(updateEmployee != null)
            {
                var EmployeeId = await mediator.Send(updateEmployee);
                return Ok(EmployeeId);

            }
            else
            {
                return BadRequest();
            }

        }

    }
}
