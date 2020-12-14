using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Account;
using Models.Event;
using Models.Map;

namespace StreetStream.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase {
        UnitOfWork unitOfWork;

        public EventsController(UnitOfWork unitOfWork) =>
            this.unitOfWork = unitOfWork;

        [HttpGet]
        public ActionResult<IEnumerable<Event>> Get(string orderByFields = "", string desc = "false", long minid = 0, long maxid = Int64.MaxValue, int offset = 0, string includingProps = "") {
            var placeMarks = unitOfWork.EventRepository.GetAsync(p => p.Id >= minid && p.Id <= maxid, includingProps, offset, orderByFields, desc);
            if (placeMarks == null) {
                Response.Headers.Add("XXX-ERROR-MESSAGE", "Invalid-Query");
                return BadRequest(placeMarks.Result);
            }
            return Ok(placeMarks.Result);
        }

        [HttpPost]
        public ActionResult<Event> Post(Event newEvent) {
            if (ModelState.IsValid) {
                if (HttpContext.Session.Keys.Contains("user_id")) {
                    if (Int64.TryParse(HttpContext.Session.GetString("user_id"), out long id)) {
                        List<CategoryEvent> categoryEvents = new List<CategoryEvent>();
                        foreach (var item in newEvent.CategoryEvent) {
                            categoryEvents.Add(item);
                        }

                        Placemark placemark = new Placemark() { X = newEvent.Placemark.X, Y = newEvent.Placemark.Y };
                        unitOfWork.EventRepository.Insert(new Event() {
                            CommercialAccount = unitOfWork.CommercialAccountRepository.GetByAsync(account => account.Id == id).Result,
                            Date = newEvent.Date, Duration = newEvent.Duration, Placemark = placemark, Name = newEvent.Name,
                            CategoryEvent = categoryEvents
                        });
                        if (unitOfWork.EventRepository.GetByAsync(item => item.Equals(newEvent)).Result == null) {
                            unitOfWork.Save();
                            //return LocalRedirectPermanentPreserveMethod("/");
                            return Ok(newEvent);
                        } else {
                            Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
                            return BadRequest(new { errorMsg = "This event exists or somthing went wrong" });
                        }
                    }
                }
            }
            return BadRequest(newEvent);
        }
    }
}