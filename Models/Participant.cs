using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tirage.Models
{
    public class Participant
    {
        public Guid Id { get; set; }
        public string Nom { get; set; }
        public string Prenom { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public string Terrain { get; set; }
        public string UserId { get; set; }
        public DateTime Creation_Date { get; set; }
    }
}
