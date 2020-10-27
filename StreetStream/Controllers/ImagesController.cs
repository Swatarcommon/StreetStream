using System.Collections.Generic;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Models.Account;

namespace StreetStream.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase {
        UnitOfWork unitOfWork;
        public ImagesController(UnitOfWork unitOfWork) {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Image>> Get(string orderByFields, string desc = "false", long minid = 0, long maxid = 1, int offset = 2, string includingProps = "") {
            var images = unitOfWork.ImageRepository.GetAsync(p => p.Id >= minid && p.Id <= maxid, includingProps, offset, orderByFields, desc);
            if (images == null) {
                Response.Headers.Add("XXX-ERROR-MESSAGE", "Invalid-Query");
                Response.StatusCode = 400;
                return BadRequest(images.Result);
            }
            return Ok(images.Result);
        }
    }
}
