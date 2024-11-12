using HCMS.Services.DataService;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Application.Features.Benefit.Command
{
    public class UpdateBenefitCommandHandler : IRequestHandler<UpdateBenefitCommand, int>
    {
        private readonly IDataService service;
        public UpdateBenefitCommandHandler(IDataService service)
        {
            this.service = service;
        }
        public async Task<int> Handle(UpdateBenefitCommand command,CancellationToken token)
        {
            var BenefitUpdated = await service.Benefits.FindAsync(command.ID);
             if(BenefitUpdated != null)
            {
                BenefitUpdated.Name = command.Name;
                BenefitUpdated.benefitType = command.BenefitType;
                BenefitUpdated.Description = command.Description;
                  service.Benefits.Update(BenefitUpdated);
                await service.SaveAsync(token);
                return command.ID;
            }
            throw new Exception();

        }
    }

}
