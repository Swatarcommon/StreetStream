using System.Collections.Generic;
using DAL;
using Microsoft.AspNetCore.Mvc;
using Models.Account;

namespace StreetStream.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class CommercialAccountsController : ControllerBase {
        UnitOfWork unitOfWork;
        public CommercialAccountsController(UnitOfWork unitOfWork) {
            this.unitOfWork = unitOfWork;
        }

        [HttpGet]
        public ActionResult<IEnumerable<CommercialAccount>> Get(string orderByFields, string desc = "false", long minid = 0, long maxid = 1, int offset = 2, string includingProps = "") {
            var commecialAccounts = unitOfWork.CommercialAccountRepository.GetAsync(p => p.Id >= minid && p.Id <= maxid, includingProps, offset, orderByFields, desc);
            if (commecialAccounts == null) {
                Response.Headers.Add("XXX-ERROR-MESSAGE", "Invalid-Query");
                Response.StatusCode = 400;
                return BadRequest(commecialAccounts.Result);
            }
            return Ok(commecialAccounts.Result);
        }
    }
}
