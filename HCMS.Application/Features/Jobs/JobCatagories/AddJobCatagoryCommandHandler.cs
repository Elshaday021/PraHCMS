using HCMS.Domain.Job;
using HCMS.Services.DataService;
using MediatR;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;


namespace HCMS.Application.Features.Jobs.JobCatagories
{
    public class AddJobCatagoryCommandHandler:IRequestHandler<AddJobCatagoryCommand,int>
    {
        private readonly IDataService dataService;
        public AddJobCatagoryCommandHandler(IDataService dataService)
        {
            this.dataService = dataService;
        }
        public async Task<int> Handle (AddJobCatagoryCommand command,CancellationToken cancellationToken)
        {
            var maxJobCatagory=dataService.JobCatagories.OrderBy(job=>job.Value).LastOrDefault();
            var newJobCatagory = new JobCatagory()
            {
                Value = maxJobCatagory.Value + 1,
                Name = command.Name,
                Description= command.Description
                
            };
            await dataService.JobCatagories.AddAsync(newJobCatagory);
            await dataService.SaveAsync(cancellationToken);
            return 1;
        }
    }
    //
    public record AddJobCategoryCommand(string name,string Description):IRequest<int>;
    public class AddJobCatagoryCommandHandler1 : IRequestHandler<AddJobCatagoryCommand, int>
    {
        private readonly IDataService Dataservice;
       public AddJobCatagoryCommandHandler1(IDataService data)
        {
            this.Dataservice = data;
        }
        public  async Task<int> Handle(AddJobCatagoryCommand command,CancellationToken cancellationToken)
        {
            var maxJobCatagory = Dataservice.JobCatagories.OrderBy(job => job.Value).LastOrDefault();
            var newJobCatagory = new JobCatagory()
            {
                Value = maxJobCatagory.Value + 1,
                Name = command.Name,
                Description = command.Description

            };
            await Dataservice.JobCatagories.AddAsync(newJobCatagory);
            await Dataservice.SaveAsync(cancellationToken);
            return 1;
        }
    }
   
}
