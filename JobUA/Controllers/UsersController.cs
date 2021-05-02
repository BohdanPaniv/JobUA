using JobUA.Models.User;
using JobUA.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace JobUA.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UserService userService;
        public UsersController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<User> Create(User user)
        {
            return await userService.Create(user);
        }

        [HttpGet("GetUserByLoginPassword/{login},{password}")]
        public async Task<User> GetUserByLoginPassword(string login, string password)
        {
            return await userService.GetUserByLoginPassword(login, password);
        }

        [HttpGet("GetUserById/{userId}")]
        public async Task<User> GetUserById(string userId)
        {
            return await userService.GetUserById(userId);
        }

        [HttpPut("UpdateUser/")]
        public async Task<User> UpdateUser(User user)
        {
            return await userService.UpdateUser(user);
        }

        [HttpPut]
        public async Task DeleteUser(string id)
        {
            await userService.DeleteUser(id);
        }
    }
}
