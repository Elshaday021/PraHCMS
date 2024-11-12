using HCMS.Domain.Enum;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Application.Features.Benefit.Command
{
    public class CreateBenefitCommand:IRequest<int>
    {
        public int ID { get; set; }
        public string Name { get; set; }

        public BenefitType BenefitType { get; set; }
        public string Description { get; set; }
    }
}
