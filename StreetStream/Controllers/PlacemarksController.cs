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
        public IEnumerable<Placemark> Get(string orderByFields, string desc = "false", long minid = 0, long maxid = 1, int offset = 2) {
            var placeMark = unitOfWork.PlacemarkRepository.Get(filter: item => (item.Id >= minid && item.Id <= maxid),
                                                       offset: offset,
                                                       desc: desc,
                                                       orderByFields: orderByFields,
                                                       include: source => source
                                                               .Include(evt => evt.Event)
                                                               .ThenInclude(cmrAcc => cmrAcc.CommercialAccount)
                                                               .Include(evt => evt.Event)
                                                               .ThenInclude(ctg => ctg.CategoryEvent)).AsEnumerable();
            if (placeMark == null) {
                Response.Headers.Add("xxx-error", "Invalid-Query");
                Response.StatusCode = 400;
                return null;
            }
            return placeMark;
        }

        [HttpGet("{id}")]
        public Placemark Get(long id) {
            //var placeMark = unitOfWork.PlacemarkRepository.GetByID(id);
            var placeMark = unitOfWork.PlacemarkRepository.GetAsync(i => i.Id == id);
            if (placeMark == null) {
                Response.Headers.Add("xxx-error", "Invalid-Id");
                Response.StatusCode = 400;
            }
            return placeMark.Result;
        }
    }
}