using JobUA.Models.EmployerVacancy;
using JobUA.Models.Vacancy;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobUA.Services
{
    public class EmployerVacancyService
    {
        IMongoCollection<EmployerVacancy> EmployerVacancies;

        public EmployerVacancyService()
        {
            EmployerVacancies = DataBaseService.GetMongoCollection<EmployerVacancy>("EmployerVacancies");
        }

        public async Task CreateEmployerVacancy(string employerId, Vacancy vacancy)
        {
            EmployerVacancy employerVacancy = new EmployerVacancy();
            employerVacancy.EmployerId = employerId;
            employerVacancy.VacancyId = vacancy.VacancyId;
            await EmployerVacancies.InsertOneAsync(employerVacancy);
        }

        public async Task<List<EmployerVacancy>> GetEmployerVacancies(string employerId)
        {
            List<EmployerVacancy> employerVacancies = await EmployerVacancies.Find(x => x.EmployerId == employerId).ToListAsync();

            if (employerVacancies != null)
            {
                return employerVacancies;
            }

            return new List<EmployerVacancy>();
        }

        public async Task DeleteEmployerVacancyById(string vacancyId)
        {
            await EmployerVacancies.DeleteOneAsync(x => x.VacancyId == vacancyId);
        }
    }
}
