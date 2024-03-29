﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Tirage.Models
{
    public class Ticket
    {
        public long Id { get; set; }
        public string Number { get; set; }
        public string Name { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName => $"{FirstName} {LastName}";
        public string PhoneNumber { get; set; }
        public long EventId { get; set; }
        public string UserId { get; set; }
        public DateTime Creation_Date { get; set; }
    }
}
