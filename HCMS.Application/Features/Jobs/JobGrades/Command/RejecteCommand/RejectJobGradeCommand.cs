﻿using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Application.Features.Jobs.JobGrades.Command.RejecteCommand
{
    public class RejectJobGradeCommand:IRequest<int>
    {
        public int id { get; set; }
    }
}
