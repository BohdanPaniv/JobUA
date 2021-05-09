using JobUA.Models.Vacancy;
using JobUA.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
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

        [HttpGet("GetVacanciesByTitle/{title}")]
        public async Task<List<Vacancy>> GetVacanciesByTitle(string title)
        {
            return await vacancyService.GetVacanciesByTitle(title);
        }

        [HttpGet("GetVacancies/")]
        public async Task<List<Vacancy>> GetVacancies()
        {
            return await vacancyService.GetVacancies();
        }

        [HttpPut("UpdateVacancy/")]
        public async Task UpdateVacancy(Vacancy vacancy)
        {
            await vacancyService.UpdateVacancy(vacancy);
        }
    }
}
