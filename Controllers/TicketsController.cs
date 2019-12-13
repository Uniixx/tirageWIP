using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Tirage.Models;
using Tirage.Repositories;

namespace Tirage.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class TicketsController : ControllerBase
    {
        private readonly ILogger<TicketsController> _logger;
        private ITicketRepository _tickets;

        public TicketsController(ILogger<TicketsController> logger, ITicketRepository ticketRepository)
        {
            _logger = logger;
            _tickets = ticketRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            List<Ticket> tickets = _tickets.GetTickets();

            if (tickets != null)
            {
                return Ok(tickets);
            }

            return NotFound();
        }

        [HttpGet("{id}")]
        public IActionResult Get(string Id)
        {
            List<Ticket> tickets = _tickets.GetTicketsByEvent(Id);

            if (tickets != null)
            {
                return Ok(tickets);
            }

            return NotFound();
        }


        [HttpPost]
        public void Create(Ticket ticket)
        {
            ticket.Creation_Date = DateTime.Now;
            _tickets.Save(ticket);
        }
    }
}
