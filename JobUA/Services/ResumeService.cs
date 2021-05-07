using JobUA.Models.Resume;
using JobUA.Models.UserResume;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JobUA.Services
{
    public class ResumeService
    {
        private readonly IMongoCollection<Resume> Resumes;
        public ResumeService()
        {
            Resumes = DataBaseService.GetMongoCollection<Resume>("Resumes");
        }

        public async Task<Resume> Create(Resume resume)
        {
            resume.ResumeId = Guid.NewGuid().ToString();
            List<Resume> foundUser = await Resumes.Find(x => x.ResumeId == resume.ResumeId).ToListAsync();

            if (foundUser.Count == 0)
            {
                await Resumes.InsertOneAsync(resume);
                return resume;
            }

            return new Resume();
        }

        public async Task<List<Resume>> GetResumes(List<UsersResume> usersResumes)
        {
            List<Resume> resumes = new List<Resume>();

            foreach (var item in usersResumes)
            {
                Resume findMatch = await Resumes.Find(x => x.ResumeId == item.ResumeId).FirstOrDefaultAsync();

                if (findMatch != null)
                {
                    resumes.Add(findMatch);
                }
            }

            return resumes;
        }

        public async Task<Resume> GetResumeById(string resumeId)
        {
            return await Resumes.Find(x => x.ResumeId == resumeId).FirstOrDefaultAsync();
        }

        public async Task DeleteResumeById(string resumeId)
        {
            await Resumes.DeleteOneAsync(x => x.ResumeId == resumeId);
        }
    }
}
