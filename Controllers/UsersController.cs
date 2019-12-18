using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using Tirage.Models;
using Tirage.Repositories;

namespace Tirage.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private IUserRepository _users;

        public UsersController(IUserRepository userRepository, UserManager<ApplicationUser> userManager)
        {
            _users = userRepository;
            _userManager = userManager;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var users = _users.GetUsers();

            if (users.Count == 0)
            {
                return NotFound();
            }

            return Ok(users);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] dynamic obj)
        {
            JObject o = JObject.Parse(obj.ToString());
            var complexObj = o.ToObject<ComplexObj>();
            var user = complexObj.user;
            var password = complexObj.password;
            var createdUser = await _userManager.CreateAsync(user, password);
            return Ok(user);
        }
    }
}
