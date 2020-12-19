using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using DAL;
using DAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Account;
using Newtonsoft.Json.Linq;

namespace StreetStream.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class CommercialAccountsController : ControllerBase {
        private UnitOfWork unitOfWork;
        private readonly IRecaptchaService recaptcha;
        public CommercialAccountsController(UnitOfWork unitOfWork, IRecaptchaService recaptcha) =>
            (this.unitOfWork, this.recaptcha) = (unitOfWork, recaptcha);

        [HttpGet]
        public ActionResult<IEnumerable<CommercialAccount>> Get(string orderByFields, string desc = "false", long minid = 0, long maxid = long.MaxValue, int offset = 0, string includingProps = "") {
            var commecialAccounts = unitOfWork.CommercialAccountRepository.GetAsync(p => p.Id >= minid && p.Id <= maxid, includingProps, offset, orderByFields, desc);
            if (commecialAccounts == null) {
                Response.Headers.Add("XXX-ERROR-MESSAGE", "Invalid-Query");
                return BadRequest(new { errorMsg = "Invalid-Query" });
            }
            return Ok(commecialAccounts.Result);
        }

        [Authorize]
        [HttpGet("{id}")]
        public ActionResult<CommercialAccount> Get(long id, string includingProps = "") {
            var commercialAccountItem = unitOfWork.CommercialAccountRepository.GetByAsync(p => p.Id == id, "Subscribers,Events,CategoryEvent,Placemark,Category").Result;
            if (commercialAccountItem == null) {
                Response.Headers.Add("XXX-ERROR", "Invalid-Id");
                return BadRequest(new { errorMsg = "Invalid Id" });
            }
            return Ok(commercialAccountItem);
        }

        [HttpPost]
        public async Task<ActionResult<CommercialAccount>> Post(SignUpViewModel<CommercialAccount> commercialAccount) {
            var (Success, ErrorCodes) = await recaptcha.Validate(commercialAccount.Token);
            if (ModelState.IsValid) {
                using SHA256 sha256Hash = SHA256.Create();
                commercialAccount.Account.Password = Hasher.GetHash(sha256Hash, commercialAccount.Account.Password);
                unitOfWork.CommercialAccountRepository.Insert(commercialAccount.Account);
                if (!Success) {
                    Response.Headers.Add("XXX-CAPTCHA-ERROR", "You'r bot, asshole!");
                    return BadRequest(new { errorMsg = "You'r bot, asshole!", captchaErrors = $"{ErrorCodes}" });
                }
                if (unitOfWork.CommercialAccountRepository.GetByAsync(item => item.Email == commercialAccount.Account.Email).Result == null) {
                    unitOfWork.Save();
                    return Ok(commercialAccount);
                } else {
                    Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
                    return BadRequest(new { errorMsg = "This email exist" });
                }
            }
            Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
            return BadRequest(new { errorMsg = "Invalid body" });
        }

        [Authorize(Roles = "commercial")]
        [HttpPut]
        public ActionResult<CommercialAccount> Put(CommercialAccount commercialAccount) {
            if (ModelState.IsValid) {
                if (Request.Cookies["user_id"].Length != 0 && Request.Cookies["user_id"] != null) {
                    if (Int64.TryParse(Request.Cookies["user_id"], out long id)) {
                        var commercialAccountItem = unitOfWork.CommercialAccountRepository.GetByAsync(p => p.Id == id, "Events,CategoryEvent,Placemark,Category").Result;

                        commercialAccountItem.Name = commercialAccount.Name;
                        if (unitOfWork.CommercialAccountRepository.GetByAsync(p => p.Email == commercialAccount.Email).Result != null) {
                            Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
                            return BadRequest(new { errorMsg = "This email exist" });
                        }
                        commercialAccountItem.Email = commercialAccount.Email;
                        using SHA256 sha256Hash = SHA256.Create();
                        if (commercialAccountItem.Password == commercialAccount.Password || commercialAccountItem.Password == Hasher.GetHash(sha256Hash, commercialAccount.Password) || commercialAccount.Password.Length != 0)
                            { } else
                            commercialAccountItem.Password = Hasher.GetHash(sha256Hash, commercialAccount.Password);
                        commercialAccountItem.Telephone = commercialAccount.Telephone;
                        commercialAccountItem.Description = commercialAccount.Description;

                        unitOfWork.CommercialAccountRepository.Update(commercialAccountItem);
                        unitOfWork.Save();
                        //return LocalRedirectPermanentPreserveMethod("/");
                        return Ok(commercialAccountItem);
                    }
                }
            }

            //return BadRequest(newEvent);
            Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
            return BadRequest(new { errorMsg = "Invalid body" });
        }

        [Authorize(Roles = "commercial")]
        [HttpDelete]
        public ActionResult<CommercialAccount> Delete() {
            if (ModelState.IsValid) {
                if (Request.Cookies["user_id"].Length != 0 && Request.Cookies["user_id"] != null) {
                    if (Int64.TryParse(Request.Cookies["user_id"], out long id)) {
                        var deletedCommercialAccount = unitOfWork.CommercialAccountRepository.Delete(id);
                        unitOfWork.Save();
                        //return LocalRedirectPermanentPreserveMethod("/");
                        return Ok(deletedCommercialAccount);
                    }
                }
            }
            //return BadRequest(newEvent);
            Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
            return BadRequest(new { errorMsg = "Invalid body" });
        }
    }
}
