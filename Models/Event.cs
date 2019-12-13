using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tirage.Models
{
    public class Event
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string UserId { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime StartDate { get; set; }
        public string TicketId { get; set; }
        public bool Over { get; set; }
    }
}
