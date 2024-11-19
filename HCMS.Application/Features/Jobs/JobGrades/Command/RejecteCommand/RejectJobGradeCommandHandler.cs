using HCMS.Domain.Enum;
using HCMS.Services.DataService;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace HCMS.Application.Features.Jobs.JobGrades.Command.RejecteCommand
{
    public class RejectJobGradeCommandHandler : IRequestHandler<RejectJobGradeCommand, int>
    {
        private readonly IDataService DataService;
        public RejectJobGradeCommandHandler(IDataService DataService)
        {
            this.DataService = DataService;
        }
        public async Task<int>Handle(RejectJobGradeCommand command, CancellationToken token)
        {
            var JobGradeID = (JobGradeEnum)command.id;
            var RejectedJobGrade = await DataService.JobGrades.FindAsync(JobGradeID);
            if (RejectedJobGrade != null)
            {
                RejectedJobGrade.Status = JobGradeStatus.Rejected;
            }
            await DataService.SaveAsync(token);
            return (int)RejectedJobGrade.Value;
        }

    }
    
}
