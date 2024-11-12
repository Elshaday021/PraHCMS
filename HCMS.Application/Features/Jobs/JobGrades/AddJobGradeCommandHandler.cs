using HCMS.Domain.Job;
using HCMS.Services.DataService;
using MediatR;
using System.ComponentModel;
using System.Reflection.Metadata.Ecma335;
using System.Threading;

namespace HCMS.Application.Features.Jobs.JobGrades
{
    public class AddJobGradeCommandHandler:IRequestHandler<AddJobGradeCommand,string>
    {
        private readonly IDataService dataService;
        public AddJobGradeCommandHandler(IDataService dataService)
        {
            this.dataService = dataService;
        }
        public async Task<string> Handle (AddJobGradeCommand command,CancellationToken cancellationToken)
        {
            var maxJobGrade = dataService.JobGrades.OrderBy(job=>job.Value).LastOrDefault();
            var jobGrade = new JobGrade()
            {
                Value = maxJobGrade.Value+1,
                Name = command.Name,
                Description = command.Description,
            };
            await dataService.JobGrades.AddAsync(jobGrade);
            await dataService.SaveAsync(cancellationToken);
            return jobGrade.Value.ToString();

        }

    }
    public class AddJobGradeCommandHandler1 : IRequestHandler<AddJobGradeCommand, string>
    {
        private readonly IDataService dataservice;
        public AddJobGradeCommandHandler1(IDataService Data)
        {
            this.dataservice = Data;

        }
        public async Task<string>Handle(AddJobGradeCommand command,CancellationToken token)
        {
            var maxJobGrade = dataservice.JobGrades.OrderBy(job => job.Value).LastOrDefault();
            var jobGrade = new JobGrade()
            {
                Value = maxJobGrade.Value+1,
                Name = command.Name,
                Description = command.Description,
            };
            await dataservice.JobGrades.AddAsync(jobGrade);
            await dataservice.SaveAsync(token);
            return jobGrade.Value.ToString();
        }
    }
}
