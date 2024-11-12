using HCMS.Application.Features.Benefit.Model;
using HCMS.Services.DataService;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;

namespace HCMS.Application.Features.Benefit.Queries
{
    public record GetBenefitQuery:IRequest<List<BenefitDto>>;
    public class GetBenefitQueryHandler:IRequestHandler<GetBenefitQuery,List<BenefitDto>>
    {
        private readonly IDataService service;
        public GetBenefitQueryHandler(IDataService service)
        {
            this.service = service;
        }
        public async Task<List<BenefitDto>> Handle(GetBenefitQuery query, CancellationToken token)
        {
            var Benefit = await service.Benefits.ToListAsync(token);
            var ReturnBenefitList = new List<BenefitDto>();

            foreach (var BB in Benefit)
            {
                var returnDto = new BenefitDto()
                {
                    ID = BB.ID,
                    Name = BB.Name,
                    benefitType = BB.benefitType.ToString(),  // Get enum name (e.g., "Health")
                    Description = BB.Description
                };

                ReturnBenefitList.Add(returnDto);
            }

            return ReturnBenefitList;
        }
    }
}
