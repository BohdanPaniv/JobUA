using JobUA.Models.Resume;
using JobUA.Models.UserResume;
using JobUA.Services;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JobUA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersResumeController
    {
        private readonly UsersResumeService usersResumeService;
        private readonly ResumeService resumeService;
        public UsersResumeController(UsersResumeService usersResumeService, ResumeService resumeService)
        {
            this.usersResumeService = usersResumeService;
            this.resumeService = resumeService;
        }

        [HttpPost("CreateUsersResume/{userId}")]
        public async Task CreateUsersResume(string userId, Resume resume)
        {
            Resume createdResume = await resumeService.Create(resume);
            await usersResumeService.CreateUsersResume(userId, createdResume);
        }

        [HttpGet("GetResumesByUserId/{userId}")]
        public async Task<List<Resume>> GetResumesByUserId(string userId)
        {
            List<UsersResume> usersResumes = await usersResumeService.GetUsersResumes(userId);

            return await resumeService.GetResumes(usersResumes);
        }

        [HttpPut("DeleteResumeById/{resumeId}")]
        public async Task DeleteResumeById(string resumeId)
        {
            await resumeService.DeleteResumeById(resumeId);
            await usersResumeService.DeleteUsersResumeById(resumeId);
        }
    }
}
