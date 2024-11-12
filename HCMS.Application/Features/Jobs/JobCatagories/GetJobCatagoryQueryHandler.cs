using HCMS.Application.Features.Jobs.JobGrades;
using HCMS.Domain.Job;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HCMS.Application.Features.Jobs.JobCatagories
{
    public record GetJobCatagoryQuery:IRequest<List<JobCatagory>>;
    internal class GetJobCatagoryQueryHandler:IRequestHandler<GetJobCatagoryQuery ,List<JobCatagory>>
    {
        private readonly IDataService dataService;

        public GetJobCatagoryQueryHandler(IDataService dataService)
        {
            this.dataService = dataService;
        }
        public async Task<List<JobCatagory>> Handle (GetJobCatagoryQuery request,CancellationToken cancellationToken)
        {
            return await dataService.JobCatagories.ToListAsync(cancellationToken);
        }
    }
}
//we can develop realworld problems on it 
public record GetJobCatagoryQuery:IRequest<List<JobCatagory>>;
internal class GetJobCatagoryQueryHandler : IRequestHandler<GetJobCatagoryQuery, List<JobCatagory>>
{
    private readonly IDataService dataservice;

    public GetJobCatagoryQueryHandler(IDataService service)
    {
        dataservice = service;
    }
    public async  Task<List<JobCatagory>>Handle(GetJobCatagoryQuery request,CancellationToken token){
        return  await dataservice.JobCatagories.ToListAsync(token);
    }
}
//added by me on the callint the command and quey