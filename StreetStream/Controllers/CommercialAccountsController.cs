using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL;
using Microsoft.AspNetCore.Http;
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
        public IEnumerable<CommercialAccount> Get(string orderByFields, string desc = "false", long minid = 0, long maxid = 1, int offset = 2, string includingProps = "") {
            var commecialAccounts = unitOfWork.CommercialAccountRepository.GetAsync(p => p.Id >= minid && p.Id <= maxid, includingProps, offset, orderByFields, desc);
            if (commecialAccounts == null) {
                Response.Headers.Add("xxx-error", "Invalid-Query");
                Response.StatusCode = 400;
                return null;
            }
            return commecialAccounts.Result;
        }
    }
}
