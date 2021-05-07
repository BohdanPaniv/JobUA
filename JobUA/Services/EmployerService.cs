using JobUA.Models.Employer;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JobUA.Services
{
    public class EmployerService
    {
        private readonly IMongoCollection<Employer> Employers;

        public EmployerService()
        {
            Employers = DataBaseService.GetMongoCollection<Employer>("Employers");
        }

        public async Task<Employer> Create(Employer employer)
        {
            employer.EmployerId = Guid.NewGuid().ToString();
            List<Employer> foundUser = await Employers.Find(x => x.Login == employer.Login).ToListAsync();

            if (foundUser.Count == 0)
            {
                await Employers.InsertOneAsync(employer);
                return employer;
            }

            return new Employer();
        }

        public async Task<Employer> GetEmployerByLoginPassword(string login, string password)
        {
            Employer findEmployer = await Employers.Find(x => x.Login == login && x.Password == password).FirstAsync();

            if(findEmployer != null)
            {
                return findEmployer;
            }

            return new Employer();
        }

        public async Task<Employer> UpdateUser(Employer user)
        {
            var filter = Builders<Employer>.Filter.Eq(x => x.EmployerId, user.EmployerId);
            return await Employers.FindOneAndReplaceAsync(filter, user);
        }
    }
}
