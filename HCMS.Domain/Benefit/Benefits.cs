using HCMS.Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Domain.Benefit
{
    public class Benefits
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public BenefitType benefitType { get; set; }
        
        public string Description { get; set; }
    }
}
