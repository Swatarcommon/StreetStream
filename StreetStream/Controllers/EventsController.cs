using System;
using System.Collections.Generic;
using DAL;
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
        public ActionResult<IEnumerable<Event>> Get(string orderByFields = "", string desc = "false", long minid = 0, long maxid = Int64.MaxValue, int offset = 0, string includingProps = "") {
            var placeMarks = unitOfWork.EventRepository.GetAsync(p => p.Id >= minid && p.Id <= maxid, includingProps, offset, orderByFields, desc);
            if (placeMarks == null) {
                Response.Headers.Add("XXX-ERROR-MESSAGE", "Invalid-Query");
                return BadRequest(placeMarks.Result);
            }
            return Ok(placeMarks.Result);
        }
    }
}