using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Event;

namespace StreetStream.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase {
        UnitOfWork unitOfWork;
        public EventsController(UnitOfWork unitOfWork) {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IEnumerable<Event> Get(string orderByFields, string desc = "false", long minid = 0, long maxid = 1, int offset = 2, string includingProps = "") {
            var placeMark = unitOfWork.EventRepository.GetAsync(p => p.Id >= minid && p.Id <= maxid, includingProps, offset, orderByFields, desc);
            if (placeMark == null) {
                Response.Headers.Add("xxx-error", "Invalid-Query");
                Response.StatusCode = 400;
                return null;
            }
            return placeMark.Result;
        }
    }
}