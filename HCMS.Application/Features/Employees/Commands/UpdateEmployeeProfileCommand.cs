using HCMS.Domain.Enums;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Application.Features.Employees
{
    public class UpdateEmployeeProfileCommand:IRequest<int>
    {

        public int Id { get; set; }
        public string EmployeeId { get; set; }
        public string Name { get; set; }
        public int BusinessUnitID { get; set; }
        public int JobTitleId { get; set; }
        public DateOnly BirthDate { get; set; }
        public DateOnly EmployementDate { get; set; }
        public Gender Gender { get; set; }
        public MartialStatus MartialStatus { get; set; }
    }
}
