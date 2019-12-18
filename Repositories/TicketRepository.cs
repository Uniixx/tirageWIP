using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tirage.Data;
using Tirage.Models;

namespace Tirage.Repositories
{
    public interface ITicketRepository
    {
        public List<Ticket> GetTickets();
        public List<Ticket> GetTicketsByEvent(long Id);
        public Ticket Save(Ticket ticket);
        public void Delete(string Number);
    }
    public class TicketRepository : ITicketRepository
    {
        private ApplicationDbContext _context;

        public TicketRepository(ApplicationDbContext db)
        {
            _context = db;
        }

        public List<Ticket> GetTickets()
        {
            return _context.Tickets.ToList();
        }

        public List<Ticket> GetTicketsByEvent(long Id)
        {
            var tickets = GetTickets();

            return tickets.Where(x => x.EventId == Id).ToList();
        }

        public Ticket Save(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            _context.SaveChanges();
            return ticket;
        }

        public void Delete(string Number)
        {
            _context.Tickets.Remove(GetTickets().FirstOrDefault(t => t.Number == Number));
            _context.SaveChanges();
        }
    }
}
