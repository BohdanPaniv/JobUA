using JobUA.Models.EmployerVacancy;
using JobUA.Models.Vacancy;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace JobUA.Services
{
    public class VacancyService
    {
        private readonly IMongoCollection<Vacancy> Vacancies;
        public VacancyService()
        {
            Vacancies = DataBaseService.GetMongoCollection<Vacancy>("Vacancies");
        }

        public async Task<Vacancy> Create(Vacancy vacancy)
        {
            vacancy.VacancyId = Guid.NewGuid().ToString();
            List<Vacancy> foundUser = await Vacancies.Find(x => x.VacancyId == vacancy.VacancyId).ToListAsync();

            if (foundUser.Count == 0)
            {
                await Vacancies.InsertOneAsync(vacancy);
                return vacancy;
            }

            return new Vacancy();
        }

        public async Task<List<Vacancy>> GetVacancies(List<EmployerVacancy> employerVacancy)
        {
            List<Vacancy> resumes = new List<Vacancy>();

            foreach (var item in employerVacancy)
            {
                Vacancy findMatch = await Vacancies.Find(x => x.VacancyId == item.VacancyId).FirstOrDefaultAsync();

                if (findMatch != null)
                {
                    resumes.Add(findMatch);
                }
            }

            return resumes;
        }

        public async Task<Vacancy> GetVacancyById(string resumeId)
        {
            return await Vacancies.Find(x => x.VacancyId == resumeId).FirstOrDefaultAsync();
        }

        public async Task<List<Vacancy>> GetVacanciesByTitle(string title)
        {
            Regex regex = new Regex(@$"[\s\S]*{title}[\s\S]*", RegexOptions.IgnoreCase);
            var filter = Builders<Vacancy>.Filter.Regex(x => x.Post, new BsonRegularExpression(regex));
            List<Vacancy> vacancies = await Vacancies.Find(filter).ToListAsync();
            return vacancies;
        }

        public async Task<List<Vacancy>> GetVacancies()
        {
            List<Vacancy> vacancies = await Vacancies.Find(x => true).ToListAsync();
            return vacancies;
        }

        public async Task DeleteVacancyById(string vacancyId)
        {
            await Vacancies.DeleteOneAsync(x => x.VacancyId == vacancyId);
        }

        public async Task UpdateVacancy(Vacancy vacancy)
        {
            var filter = Builders<Vacancy>.Filter.Eq(x => x.VacancyId, vacancy.VacancyId);
            await Vacancies.FindOneAndReplaceAsync(filter, vacancy);
        }
    }
}
