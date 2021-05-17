using JobUA.Models.User;
using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace JobUA.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> Users;
        public UserService()
        {
            Users = DataBaseService.GetMongoCollection<User>("Users");
        }

        public async Task<User> Create(User user)
        {
            user.UserId = Guid.NewGuid().ToString();
            List<User> foundUser = await Users.Find(x => x.Login == user.Login).ToListAsync();

            if (foundUser.Count == 0)
            {
                await Users.InsertOneAsync(user);
                return user;
            }

            return new User();
        }

        public async Task<User> GetUserById(string userId)
        {
            return await Users.Find(x => x.UserId == userId).FirstAsync();
        }

        public async Task<User> GetUserByLoginPassword(string login, string password)
        {
            User findUser = await Users.Find(x => x.Login == login && x.Password == password).FirstOrDefaultAsync();
            
            if(findUser != null)
            {
                return findUser;
            }

            return new User();
        }

        public async Task<User> UpdateUser(User user)
        {
            var filter = Builders<User>.Filter.Eq(x => x.UserId, user.UserId);
            return await Users.FindOneAndReplaceAsync(filter, user);
        }

        public async Task DeleteUser(string id)
        {
            await Users.DeleteOneAsync(x => x.UserId == id);
        }
    }
}
