using AutoMapper;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore.Update.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Application.Features.Employees.Commands
{
    internal class UpdateEmployeeProfileCommandHandler:IRequestHandler<UpdateEmployeeProfileCommand,int>
    {
        private readonly IMapper mapper;
        private readonly IDataService service;
        public UpdateEmployeeProfileCommandHandler(IDataService service)
        {
            this.service = service;
        }
        public async Task<int>Handle(UpdateEmployeeProfileCommand command,CancellationToken token)
        {
            int EmployeeId = command.Id;
            var updatedEmployee = await service.Employees.FindAsync(command.Id);
             
            if(updatedEmployee != null)
            {
                updatedEmployee.Name = command.Name;
                updatedEmployee.EmployeeId = EmployeeId;
                updatedEmployee.JobTitleId = command.JobTitleId;
                updatedEmployee.BusinessUnitID = command.BusinessUnitID;
                updatedEmployee.EmployementDate = command.EmployementDate;
                updatedEmployee.BirthDate = command.BirthDate;

            }
             service.Employees.Update(updatedEmployee);
            await service.SaveAsync(token);
            return EmployeeId;
        }


    }
}
