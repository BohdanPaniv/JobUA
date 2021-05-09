﻿using JobUA.Models.EmployerVacancy;
using JobUA.Models.Vacancy;
using JobUA.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JobUA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployerVacancyController
    {
        private readonly EmployerVacancyService employerVacancyService;
        private readonly VacancyService vacancyService;
        public EmployerVacancyController(EmployerVacancyService employerVacancyService, VacancyService vacancyService)
        {
            this.employerVacancyService = employerVacancyService;
            this.vacancyService = vacancyService;
        }

        [HttpPost("CreateEmployerVacancy/{employerId}")]
        public async Task CreateEmployerVacancy(string employerId, Vacancy vacancy)
        {
            Vacancy createVacancy = await vacancyService.Create(vacancy);
            await employerVacancyService.CreateEmployerVacancy(employerId, createVacancy);
        }

        [HttpGet("GetVacanciesByEmployerId/{employerId}")]
        public async Task<List<Vacancy>> GetVacanciesByEmployerId(string employerId)
        {
            List<EmployerVacancy> employerVacancies = await employerVacancyService.GetEmployerVacancies(employerId);
            return await vacancyService.GetVacancies(employerVacancies);
        }

        [HttpPut("DeleteVacancyById/{vacancyId}")]
        public async Task DeleteVacancyById(string vacancyId)
        {
            await vacancyService.DeleteVacancyById(vacancyId);
            await employerVacancyService.DeleteEmployerVacancyById(vacancyId);
        }
    }
}
