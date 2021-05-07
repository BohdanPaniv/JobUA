using JobUA.Models.Employer;
using JobUA.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace JobUA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployersController : Controller
    {
        private readonly EmployerService employerService;

        public EmployersController(EmployerService employerService)
        {
            this.employerService = employerService;
        }

        [HttpPost]
        public async Task<Employer> Create(Employer user)
        {
            return await employerService.Create(user);
        }

        [HttpGet("GetEmployerByLoginPassword/{login},{password}")]
        public async Task<Employer> GetUserByLoginPassword(string login, string password)
        {
            return await employerService.GetEmployerByLoginPassword(login, password);
        }

        [HttpPut("UpdateEmployer/")]
        public async Task<Employer> UpdateUser(Employer user)
        {
            return await employerService.UpdateUser(user);
        }
    }
}
