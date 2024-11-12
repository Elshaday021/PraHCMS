using HCMS.Services.DataService;
using MediatR;
using HCMS.Domain.Benefit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HCMS.Application.Features.Jobs.JobCatagories;
using HCMS.Application.Features.Benefit.Model;
using HCMS.Domain.Enum;
namespace HCMS.Application.Features.Benefit.Command
{
    public class CreateBenefitCommandHandler : IRequestHandler<CreateBenefitCommand, int>
    {
        private readonly IDataService service;
        public CreateBenefitCommandHandler(IDataService service)
        {
            this.service = service;
        }
        public async Task<int> Handle(CreateBenefitCommand command, CancellationToken cancellationToken)
        {

            var benefit = new Benefits()
            {
                Name = command.Name,
                benefitType = command.BenefitType,
                Description = command.Description,

            };
             await service.Benefits.AddAsync(benefit);
             await service.SaveAsync(cancellationToken);
            return 1;
        }
    }
}
