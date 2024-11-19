using HCMS.Application.Features.Jobs.JobGrades.Models;
using HCMS.Domain.Enum;
using HCMS.Domain.Job;
using HCMS.Services.DataService;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Application.Features.Jobs.JobGrades.Queries.DraftQuery
{
    public record JobGradeByIDQuery(int ID) : IRequest<JobGrade>;
    public class JobGradeQueryByIDHandler : IRequestHandler<JobGradeByIDQuery, JobGrade>
    {
        public readonly IDataService DataService;
        public JobGradeQueryByIDHandler(IDataService DataService)
        {
            this.DataService = DataService;
        }
        public async Task<JobGrade> Handle(JobGradeByIDQuery query, CancellationToken token)
        {
            var JobGradeID = (JobGradeEnum)query.ID;
            var JobGrade = await DataService.JobGrades.FindAsync(JobGradeID);

            return JobGrade;
        }
    }
}
