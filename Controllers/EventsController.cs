using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Tirage.Models;
using Tirage.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tirage.Controllers
{
    [Authorize]
    [ApiController]
    [Route("[controller]")]
    public class EventsController : Controller
    {
        private readonly ILogger<EventsController> _logger;
        private IEventRepository _events;

        public EventsController(ILogger<EventsController> logger, IEventRepository eventRepository)
        {
            _logger = logger;
            _events = eventRepository;
        } 

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            List<Event> events = _events.GetEventsByUserId(id);

            if (events != null)
            {
                return Ok(events);
            }

            return NotFound();
        }

        [HttpPost]
        public IActionResult Post(Event model)
        {
            _events.Create(model);
            return Ok(model);
        }
    }
}
