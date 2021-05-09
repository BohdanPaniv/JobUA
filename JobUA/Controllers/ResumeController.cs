using JobUA.Models.Resume;
using JobUA.Services;
using Microsoft.AspNetCore.Mvc;
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
    }
}
