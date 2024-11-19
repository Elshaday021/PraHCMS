using HCMS.Application.Features.Benefit.Model;
using HCMS.Domain.Enum;
using HCMS.Services.DataService;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HCMS.Application.Features.Benefit.Queries
{
    public record GetBenefitByIdQuery(int ID):IRequest<BenefitDto>;
    public class GetBenefitByIdQueryHandler : IRequestHandler<GetBenefitByIdQuery, BenefitDto>
    {
        private readonly IDataService service;
        public GetBenefitByIdQueryHandler(IDataService service)
        {
            this.service = service;
        }
        public async Task<BenefitDto> Handle(GetBenefitByIdQuery query,CancellationToken token)
        {   

            var updateBenfit= await service.Benefits.FindAsync(query.ID);
             if(updateBenfit != null)
            {
                var Benefit = new BenefitDto()
                {
                    ID = updateBenfit.ID,
                    Name = updateBenfit.Name,
                    benefitType = updateBenfit.benefitType.ToString(),
                    Description = updateBenfit.Description
                };
            return Benefit;
            }
            throw new Exception("Benefit not found");
        }
    }

}
