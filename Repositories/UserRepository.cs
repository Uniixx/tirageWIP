using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tirage.Data;
using Tirage.Models;

namespace Tirage.Repositories
{
    public interface IUserRepository
    {
        public List<ApplicationUser> GetUsers();
    }
    public class UserRepository : IUserRepository
    {
        private ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext db)
        {
            _context = db;
        }

        public List<ApplicationUser> GetUsers()
        {
            return _context.Users.ToList();
        }
    }
}
