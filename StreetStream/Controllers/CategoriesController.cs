using System.Collections.Generic;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Models.Event;

namespace StreetStream.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase {
        UnitOfWork unitOfWork;
        public CategoriesController(UnitOfWork unitOfWork) {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Category>> Get(string orderByFields, string desc = "false", long minid = 0, long maxid = 1, int offset = 2, string includingProps = "") {
            var categories = unitOfWork.CategoryRepository.GetAsync(p => p.Id >= minid && p.Id <= maxid, includingProps, offset, orderByFields, desc);
            if (categories == null) {
                Response.Headers.Add("XXX-ERROR-MESSAGE", "Invalid-Query");
                return BadRequest(categories.Result);
            }
            return Ok(categories.Result);
        }
    }
}
