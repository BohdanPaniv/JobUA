using JobUA.Models.Resume;
using JobUA.Models.UserResume;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
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

        public async Task UpdateResume(Resume resume)
        {
            var filter = Builders<Resume>.Filter.Eq(x => x.ResumeId, resume.ResumeId);
            await Resumes.FindOneAndReplaceAsync(filter, resume);
        }

        public async Task<List<Resume>> GetResumesByTitle(string title)
        {
            Regex regex = new Regex(@$"[\s\S]*{title}[\s\S]*", RegexOptions.IgnoreCase);
            var filter = Builders<Resume>.Filter.Regex(x => x.Post, new BsonRegularExpression(regex));
            List<Resume> vacancies = await Resumes.Find(filter).ToListAsync();
            return vacancies;
        }

        public async Task<List<Resume>> GetResumes()
        {
            List<Resume> vacancies = await Resumes.Find(x => true).ToListAsync();
            return vacancies;
        }
    }
}
