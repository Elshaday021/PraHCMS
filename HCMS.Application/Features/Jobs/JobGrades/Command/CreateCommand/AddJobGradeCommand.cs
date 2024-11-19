using HCMS.Domain.Enum;
using MediatR;

namespace HCMS.Application.Features.Jobs.JobGrades.Command.CreateCommand
{
    public class AddJobGradeCommand : IRequest<string>
    {
        public string Name { get; set; }
        public string Description { get; set; }

        public JobGradeStatus Status { get; set; }

    }
}
















































































