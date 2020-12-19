using System;
using System.Collections.Generic;
using DAL;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("{id}")]
        public ActionResult<Event> Get(long id, string includingProps = "") {
            var eventItem = unitOfWork.EventRepository.GetByAsync(p => p.Id == id, includingProps).Result;
            if (eventItem == null) {
                Response.Headers.Add("XXX-ERROR", "Invalid-Id");
                return BadRequest(new { errorMsg = "Invalid Id" });
            }
            return Ok(eventItem);
        }

        [HttpPost]
        public ActionResult<Event> Post(Event newEvent) {
            if (ModelState.IsValid) {
                if (Request.Cookies["user_id"].Length != 0 && Request.Cookies["user_id"] != null) {
                    if (Int64.TryParse(Request.Cookies["user_id"], out long id)) {
                        List<CategoryEvent> categoryEvents = new List<CategoryEvent>();
                        foreach (var item in newEvent.CategoryEvent) {
                            categoryEvents.Add(item);
                        }

                        Placemark placemark = new Placemark() { X = newEvent.Placemark.X, Y = newEvent.Placemark.Y };
                        unitOfWork.EventRepository.Insert(new Event() {
                            CommercialAccount = unitOfWork.CommercialAccountRepository.GetByAsync(account => account.Id == id).Result,
                            Date = newEvent.Date, Duration = newEvent.Duration, Placemark = placemark, Name = newEvent.Name,
                            Description = newEvent.Description,
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
            //return BadRequest(newEvent);
            Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
            return BadRequest(new { errorMsg = "Invalid body" });
        }

        [Authorize]
        [HttpPut]
        public ActionResult<Event> Put(Event newEvent) {
            if (ModelState.IsValid) {
                if (Request.Cookies["user_id"].Length != 0 && Request.Cookies["user_id"] != null) {
                    if (Int64.TryParse(Request.Cookies["user_id"], out long id)) {
                        var eventItem = unitOfWork.EventRepository.GetByAsync(p => p.Id == newEvent.Id, "placemark,description,categoryevent").Result;
                        List<CategoryEvent> categoryEvents = new List<CategoryEvent>();
                        foreach (var item in newEvent.CategoryEvent) {
                            categoryEvents.Add(item);
                        }

                        eventItem.Name = newEvent.Name;
                        eventItem.Date = newEvent.Date;
                        eventItem.Duration = newEvent.Duration;
                        eventItem.CategoryEvent = newEvent.CategoryEvent;
                        eventItem.Description = newEvent.Description;

                        unitOfWork.EventRepository.Update(eventItem);
                        unitOfWork.Save();
                        //return LocalRedirectPermanentPreserveMethod("/");
                        return Ok(eventItem);
                    }
                }
            }

            //return BadRequest(newEvent);
            Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
            return BadRequest(new { errorMsg = "Invalid body" });
        }

        [Authorize]
        [HttpDelete("{id}")]
        public ActionResult<Event> Delete(long id) {
            if (ModelState.IsValid) {
                if (Request.Cookies["user_role"].Length != 0 && Request.Cookies["user_role"] != null) {
                    if (Request.Cookies["user_role"] == "commercial") {
                        var deletedEvent= unitOfWork.EventRepository.Delete(id);
                        unitOfWork.Save();
                        //return LocalRedirectPermanentPreserveMethod("/");
                        return Ok(deletedEvent);
                    }
                }
            }

            //return BadRequest(newEvent);
            Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
            return BadRequest(new { errorMsg = "Invalid body" });
        }
    }
}