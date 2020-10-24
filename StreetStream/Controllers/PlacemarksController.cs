using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Account;
using Models.Map;

namespace StreetStream.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class PlacemarksController : ControllerBase {
        UnitOfWork unitOfWork;
        public PlacemarksController(UnitOfWork unitOfWork) {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public IEnumerable<Placemark> Get(string orderByFields, string desc = "false", long minid = 0, long maxid = 1, int offset = 2, string includingProps = "") {
            var placeMark = unitOfWork.PlacemarkRepository.GetAsync(p => p.Id >= minid && p.Id <= maxid, includingProps, offset, orderByFields, desc);
            if (placeMark == null) {
                Response.Headers.Add("xxx-error", "Invalid-Query");
                Response.StatusCode = 400;
                return null;
            }
            return placeMark.Result;
        }

        [HttpGet("{id}")]
        public Placemark Get(long id, string includingProps = "") {
            var placeMark = unitOfWork.PlacemarkRepository.GetByAsync(p => p.Id == id, includingProps);
            if (placeMark == null) {
                Response.Headers.Add("xxx-error", "Invalid-Id");
                Response.StatusCode = 400;
            }
            return placeMark.Result;
        }
    }
}