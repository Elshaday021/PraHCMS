﻿using HCMS.Domain.Job;
using HCMS.Services.DataService;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace HCMS.Application.Features.Jobs.JobGrades.Queries.DraftQuery
{
    public record GetJobGradeQuery : IRequest<List<JobGrade>>;
    internal class GetJobGradeQueryHandler : IRequestHandler<GetJobGradeQuery, List<JobGrade>>
    {
        private readonly IDataService dataService;

        public GetJobGradeQueryHandler(IDataService dataService)
        {
            this.dataService = dataService;
        }
        public async Task<List<JobGrade>> Handle(GetJobGradeQuery request, CancellationToken cancellationToken)
        {
            return await dataService.JobGrades.ToListAsync(cancellationToken);
        }
    }
}
