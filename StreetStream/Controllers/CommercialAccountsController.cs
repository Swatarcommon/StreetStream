using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DAL;
using DAL.Services;
using Microsoft.AspNetCore.Mvc;
using Models.Account;
using Newtonsoft.Json.Linq;

namespace StreetStream.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class CommercialAccountsController : ControllerBase {
        private UnitOfWork unitOfWork;
        private readonly IRecaptchaService recaptcha;
        public CommercialAccountsController(UnitOfWork unitOfWork, IRecaptchaService recaptcha) {
            this.unitOfWork = unitOfWork;
            this.recaptcha = recaptcha;
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

        [HttpPost]
        public async Task<ActionResult<CommercialAccount>> Post(SignUpViewModel<CommercialAccount> commercialAccount) {
            var captchaResponse = await recaptcha.Validate(commercialAccount.Token);
            unitOfWork.CommercialAccountRepository.Insert(commercialAccount.Account);
            if (!captchaResponse.Success) {
                Response.Headers.Add("XXX-CAPTCHA-ERROR", "You'r bot, asshole!");
                return BadRequest(new { Error = "You'r bot, asshole!" }.ToString());
            }
            if (unitOfWork.Save(out string message))
                return Ok(commercialAccount);
            else {
                Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
                return BadRequest(new { Error = message }.ToString());
            }
        }
    }
}
