using HCMS.Domain.Enum;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Application.Features.Jobs.JobGrades.Command.SubmitCommand
{
    public class SubmitJobGradeCommandHandler : IRequestHandler<SubmitJobGradeCommand, int>
    {
        private readonly IDataService DataService;
        public SubmitJobGradeCommandHandler(IDataService DataService)
        {
            this.DataService = DataService;
        }

        public async Task<int> Handle(SubmitJobGradeCommand command,CancellationToken token)
        {
            var JobGradeID = (JobGradeEnum)command.id;
            var submitedJobGrade = await DataService.JobGrades.FindAsync(JobGradeID);
            submitedJobGrade.Status = JobGradeStatus.Submitted;
                 await DataService.SaveAsync(token);
                return (int)submitedJobGrade.Value;
        }
    }
   
}
