using HCMS.Domain.Enum;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Application.Features.Jobs.JobGrades.Command.UpdateCommand
{
    public class JobGradeUpdateCommand : IRequest<string>
    {

        public int Value { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public JobGradeStatus Status { get; set; }
    }
}
