﻿using JobUA.Models.User;
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

        public async Task<User> LogIn(string login, string password)
        {
            List<User> foundUser = await Users.Find(x => x.Login == login &&
                x.Password == password).ToListAsync();

            if (foundUser.Count == 0)
            {
                return new User();
            }

            return foundUser[0];
        }

        public async Task UpdateUser(User user)
        {
            await Users.ReplaceOneAsync(x => x.UserId == user.UserId, user);
        }

        public async Task DeleteUser(string id)
        {
            await Users.DeleteOneAsync(x => x.UserId == id);
        }
    }
}
