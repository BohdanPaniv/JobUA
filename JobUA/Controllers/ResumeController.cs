using JobUA.Models.Resume;
using JobUA.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JobUA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResumeController : Controller
    {
        private readonly ResumeService resumeService;
        public ResumeController(ResumeService resumeService)
        {
            this.resumeService = resumeService;
        }

        [HttpPost]
        public async Task<Resume> Create(Resume resume)
        {
            return await resumeService.Create(resume);
        }

        [HttpGet("GetResumeById/{resumeId}")]
        public async Task<Resume> GetResumeById(string resumeId)
        {
            return await resumeService.GetResumeById(resumeId);
        }

        [HttpPut("UpdateResume/")]
        public async Task UpdateResume(Resume resume)
        {
            await resumeService.UpdateResume(resume);
        }

        [HttpGet("GetResumesByTitle/{title}")]
        public async Task<List<Resume>> GetResumesByTitle(string title)
        {
            return await resumeService.GetResumesByTitle(title);
        }

        [HttpGet("GetResumes/")]
        public async Task<List<Resume>> GetResumes()
        {
            return await resumeService.GetResumes();
        }
    }
}
