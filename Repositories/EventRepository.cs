using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tirage.Data;
using Tirage.Models;

namespace Tirage.Repositories
{
    public interface IEventRepository
    {
        public List<Event> GetEvents();
        public List<Event> GetEventsByUserId(string Id);
        public void Create(Event model);
    }
    public class EventRepository : IEventRepository
    {
        private ApplicationDbContext _context;
        public EventRepository(ApplicationDbContext db)
        {
            _context = db;
        }

        public List<Event> GetEvents()
        {
            return _context.Events.ToList();
        }

        public void Create(Event model) 
        {
            _context.Events.Add(model);
            _context.SaveChanges();
        }

        public List<Event> GetEventsByUserId(string Id)
        {
            var events = GetEvents();
            return events.Where(e => e.UserId == Id).ToList();
        }
    }
}
