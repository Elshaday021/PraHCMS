using HCMS.Domain.Enum;
using HCMS.Domain.Job;
using HCMS.Services.DataService;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Application.Features.Jobs.JobGrades.Command.ApprovedCommand
{
    public class ApproveJobGradeCommandHandler : IRequestHandler<ApproveJobGradeCommand, int>
    {

        private readonly IDataService DataService;
        public ApproveJobGradeCommandHandler(IDataService DataService)
        {
            this.DataService = DataService;
        }
        public async Task<int>Handle(ApproveJobGradeCommand command,CancellationToken token)
        {
            var JobGradeID = (JobGradeEnum)command.id;
            var ApprovedJobGrade = await DataService.JobGrades.FindAsync(JobGradeID);
            ApprovedJobGrade.Status = JobGradeStatus.Approved;
            await DataService.SaveAsync(token);
            return (int)ApprovedJobGrade.Value;
        }
    }
}
