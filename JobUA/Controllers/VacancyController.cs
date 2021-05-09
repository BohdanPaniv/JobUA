using JobUA.Models.Vacancy;
using JobUA.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace JobUA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VacancyController : Controller
    {
        private readonly VacancyService vacancyService;
        public VacancyController(VacancyService vacancyService)
        {
            this.vacancyService = vacancyService;
        }

        [HttpPost]
        public async Task<Vacancy> Create(Vacancy vacancy)
        {
            return await vacancyService.Create(vacancy);
        }

        [HttpGet("GetVacancyById/{vacancyId}")]
        public async Task<Vacancy> GetVacancyById(string vacancyId)
        {
            return await vacancyService.GetVacancyById(vacancyId);
        }

        [HttpPut("UpdateVacancy/")]
        public async Task UpdateVacancy(Vacancy vacancy)
        {
            await vacancyService.UpdateVacancy(vacancy);
        }
    }
}
