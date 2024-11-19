using HCMS.Domain.Enum;
using HCMS.Domain.Job;
using HCMS.Services.DataService;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Application.Features.Jobs.JobGrades.Command.UpdateCommand
{
    public class JobGradeUpdateCommandHandler : IRequestHandler<JobGradeUpdateCommand, string>
    {
        private readonly IDataService DataService;
        public JobGradeUpdateCommandHandler(IDataService DataService)
        {
            this.DataService = DataService;
        }
        public async Task<string> Handle(JobGradeUpdateCommand command, CancellationToken token)
        {
            var updatedId = (JobGradeEnum)command.Value;
            var UpdateJobGrade = DataService.JobGrades.Find(updatedId);
            if (UpdateJobGrade != null)
            {
                UpdateJobGrade.Name = command.Name;
                UpdateJobGrade.Description = command.Description;
                UpdateJobGrade.Status = command.Status;
            }
            DataService.JobGrades.Update(UpdateJobGrade);
            await DataService.SaveAsync(token);
            return UpdateJobGrade.Value.ToString();
        }

    }
}

