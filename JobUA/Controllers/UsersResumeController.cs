using JobUA.Models.Resume;
using JobUA.Models.User;
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
        private readonly UserService userService;
        public UsersResumeController(UsersResumeService usersResumeService, ResumeService resumeService, UserService userService)
        {
            this.usersResumeService = usersResumeService;
            this.resumeService = resumeService;
            this.userService = userService;
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

        [HttpGet("GetUserByResumeId/{resumeId}")]
        public async Task<User> GetUserByResumeId(string resumeId)
        {
            UsersResume usersResume = await usersResumeService.GetUserByResumeId(resumeId);
            return await userService.GetUserById(usersResume.UserId);
        }
    }
}
