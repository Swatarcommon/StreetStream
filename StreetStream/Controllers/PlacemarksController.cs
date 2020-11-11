using System;
using System.Collections.Generic;
using System.Linq;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Models.Map;

namespace StreetStream.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class PlacemarksController : ControllerBase {
        UnitOfWork unitOfWork;
        public PlacemarksController(UnitOfWork unitOfWork) =>
            this.unitOfWork = unitOfWork;

        [HttpGet]
        public ActionResult<IEnumerable<Placemark>> Get(string orderByFields, string desc = "false", long minid = 0, long maxid = 1, int offset = 2, string includingProps = "") {
            var placeMark = unitOfWork.PlacemarkRepository.GetAsync(p => p.Id >= minid && p.Id <= maxid, includingProps, offset, orderByFields, desc);
            if (placeMark == null) {
                Response.Headers.Add("XXX-ERROR-MESSAGE", "Invalid-Query");
                return BadRequest(new { errorMsg = "Invalid-Query" });
            }
            return Ok(placeMark.Result);
        }

        [HttpGet("{id}")]
        public ActionResult<Placemark> Get(long id, string includingProps = "") {
            var placeMark = unitOfWork.PlacemarkRepository.GetByAsync(p => p.Id == id, includingProps);
            if (placeMark == null) {
                Response.Headers.Add("XXX-ERROR", "Invalid-Id");
                return BadRequest(new { errorMsg = "Invalid Id" });
            }
            return Ok(placeMark.Result);
        }

        [HttpPost]
        public ActionResult<Placemark> Post(Placemark placemark) {
            if (ModelState.IsValid) {
                unitOfWork.PlacemarkRepository.Insert(placemark);
                if (unitOfWork.PlacemarkRepository.GetByAsync(item => item.Equals(placemark)).Result == null) {
                    unitOfWork.Save();
                    return LocalRedirectPermanentPreserveMethod("");
                } else {
                    Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
                    return BadRequest(new { errorMsg = "This placemark exists" });
                }
            }
            return BadRequest(placemark);
        }
    }
}