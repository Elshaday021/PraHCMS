using HCMS.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Application.Features.Benefit.Model
{
    public class BenefitDto
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string benefitType { get; set; }

        public string Description { get; set; }
    }
}
