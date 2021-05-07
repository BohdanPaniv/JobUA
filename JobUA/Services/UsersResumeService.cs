using JobUA.Models.Resume;
using JobUA.Models.UserResume;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace JobUA.Services
{
    public class UsersResumeService
    {
        IMongoCollection<UsersResume> UsersResumes;

        public UsersResumeService()
        {
            UsersResumes = DataBaseService.GetMongoCollection<UsersResume>("UsersResumes");
        }

        public async Task CreateUsersResume(string userId, Resume resume)
        {
            UsersResume usersResume = new UsersResume();
            usersResume.UserId = userId;
            usersResume.ResumeId = resume.ResumeId;
            await UsersResumes.InsertOneAsync(usersResume);
        }

        public async Task<List<UsersResume>> GetUsersResumes(string userId)
        {
            List<UsersResume> usersResumes = await UsersResumes.Find(x => x.UserId == userId).ToListAsync();

            if (usersResumes != null)
            {
                return usersResumes;
            }

            return new List<UsersResume>();
        }
    }
}
