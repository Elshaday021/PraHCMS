using HCMS.Application.Features.Jobs.JobCatagories;
using HCMS.Application.Features.Jobs.JobGrades;
using HCMS.Application.Features.Jobs.JobGrades.Command.ApprovedCommand;
using HCMS.Application.Features.Jobs.JobGrades.Command.CreateCommand;
using HCMS.Application.Features.Jobs.JobGrades.Command.RejecteCommand;
using HCMS.Application.Features.Jobs.JobGrades.Command.SubmitCommand;
using HCMS.Application.Features.Jobs.JobGrades.Command.UpdateCommand;
using HCMS.Application.Features.Jobs.JobGrades.Models;
using HCMS.Application.Features.Jobs.JobGrades.Queries;
using HCMS.Application.Features.Jobs.JobGrades.Queries.DraftQuery;
using HCMS.Application.Features.Jobs.JobTitles;
using HCMS.Domain.Job;
using MediatR;
using Microsoft.AspNetCore.Mvc;


namespace HCMS.API.Controllers.JobController
{

    [Route("api/[controller]")]
    [ApiController]
    public class JobController:BaseController<JobController>
    {
 
        [HttpPost("AddJobGrade",Name ="AddJobGrade")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<string>> AddJobGrade([FromBody]AddJobGradeCommand command)
        {
            var jobGrade=await mediator.Send(command);
            return (jobGrade);
        }
        [HttpPut("UpdateJobGrade", Name ="UpdateJobGrade")]
        [ProducesResponseType(200)]
        [ProducesResponseType(400)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<string>> UpdateJobGrade([FromBody] JobGradeUpdateCommand command)
        {
            try
            {

                var jobGradeUpdated = await mediator.Send(command);
                return Ok(new{ data=jobGradeUpdated});
            }
            catch(Exception ex)
            {
                return ex.Message;
            }
        }
        [HttpPut("SubmitJobGrade",Name ="SubmitJobGrade")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<int>>SubmitJobGrade(int id)
        {
            var submittedJobGrade = await mediator.Send(new SubmitJobGradeCommand { id=id});
            return (ActionResult<int>)submittedJobGrade;
        }
        [HttpPut("RejectJobGrade",Name ="RejectJobGrade")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]

        public async Task<ActionResult<int>>RejectJobGrade(int id)
        {
            var RejectedJobGrade = await mediator.Send( new RejectJobGradeCommand { id=id});
            return (int)RejectedJobGrade;

        }
        [HttpPut("ApprovedJobGrade",Name ="ApprovedJobGrade")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<int>>ApproveJobGrade(int id)
        {
            var ApprovedJobGrade = await mediator.Send(new ApproveJobGradeCommand { id=id});
            return (int)ApprovedJobGrade;
        }
        [HttpGet("GetByID",Name ="GetByID")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<ActionResult<JobGrade>>GetJobGradeById(int id)
        {
            
                var JobGrade = await mediator.Send(new JobGradeByIDQuery(id));
                return JobGrade;


        }
        [HttpPost("AddJobTitle", Name = "AddJobTitle")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> AddJobTitle([FromBody] AddJobTitleCommand command)
        {
            var jobGrade = await mediator.Send(command);
            return (jobGrade);
        }
        [HttpPost("AddJobCatagory", Name = "AddJobCatagory")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<int>> AddJobCatagory([FromBody] AddJobCatagoryCommand command)
        {
            var jobGrade = await mediator.Send(command);
            return (jobGrade);
        }
        [HttpGet("allJobTitles", Name = "GetAllJobTitle")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<JobTitleDto>>> GetAllJobTitle()
        {
            var searchResult = await mediator.Send(new GetJobTitleQuery());
            return searchResult;
        }
        [HttpGet("allJobGrades", Name = "GetAllJobGrade")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<JobGrade>>> GetAllJobGrade()
        {
            var searchResult = await mediator.Send(new GetJobGradeQuery());
            return searchResult;
        }
        [HttpGet("allJobCatagory", Name = "GetAllJobCatagory")]
        [ProducesResponseType(200)]
        public async Task<ActionResult<List<JobCatagory>>> GetAllJobCatagory()
        {
            var searchResult = await mediator.Send(new GetJobCatagoryQuery());
            return searchResult;
        }
    };
}
