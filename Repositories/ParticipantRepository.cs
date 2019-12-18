using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Tirage.Data;
using Tirage.Models;

namespace Tirage.Repositories
{
    public interface IParticipantRepository
    {

    }
    public class ParticipantRepository : IParticipantRepository
    {
        private ApplicationDbContext _context;

        public ParticipantRepository(ApplicationDbContext db)
        {
            _context = db;
        }

        private List<Participant> GetAllParticipants()
        {
            return _context.Participants.ToList();
        }

        public void Create(Participant participant) 
        { 
        }

        public void Delete(Participant participant)
        {
            _context.Participants.Remove(participant);
            _context.SaveChanges();
        }

        public void Update(Participant participant)
        {
            _context.Participants.Update(participant);
            _context.SaveChanges();
        }
    }
}
