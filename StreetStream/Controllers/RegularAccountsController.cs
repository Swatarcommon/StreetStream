using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Threading.Tasks;
using DAL;
using DAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models.Account;

namespace StreetStream.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class RegularAccountsController : ControllerBase {

        private UnitOfWork unitOfWork;
        private readonly IRecaptchaService recaptcha;
        public RegularAccountsController(UnitOfWork unitOfWork, IRecaptchaService recaptcha) =>
            (this.unitOfWork, this.recaptcha) = (unitOfWork, recaptcha);

        [HttpGet]
        public ActionResult<IEnumerable<RegularAccount>> Get(string orderByFields, string desc = "false", long minid = 0, long maxid = long.MaxValue, int offset = 0, string includingProps = "") {
            var regularAccounts = unitOfWork.RegularAccountRepository.GetAsync(p => p.Id >= minid && p.Id <= maxid, includingProps, offset, orderByFields, desc);
            if (regularAccounts == null) {
                Response.Headers.Add("XXX-ERROR-MESSAGE", "Invalid-Query");
                return BadRequest(new { errorMsg = "Invalid-Query" });
            }
            return Ok(regularAccounts.Result);
        }

        [HttpGet("{id}")]
        public ActionResult<RegularAccount> Get(long id, string includingProps = "") {
            var regularAccountItem = unitOfWork.RegularAccountRepository.GetByAsync(p => p.Id == id, "").Result;
            if (regularAccountItem == null) {
                Response.Headers.Add("XXX-ERROR", "Invalid-Id");
                return BadRequest(new { errorMsg = "Invalid Id" });
            }
            return Ok(regularAccountItem);
        }

        [HttpPost]
        public async Task<ActionResult<RegularAccount>> Post(SignUpViewModel<RegularAccount> regularAccounts) {
            var (Success, ErrorCodes) = await recaptcha.Validate(regularAccounts.Token);
            if (ModelState.IsValid) {
                using SHA256 sha256Hash = SHA256.Create();
                regularAccounts.Account.Password = Hasher.GetHash(sha256Hash, regularAccounts.Account.Password);
                unitOfWork.RegularAccountRepository.Insert(regularAccounts.Account);
                if (false) {
                    Response.Headers.Add("XXX-CAPTCHA-ERROR", "You'r bot, asshole!");
                    return BadRequest(new { errorMsg = "You'r bot, asshole!", captchaErrors = $"{ErrorCodes}" });
                }
                if (unitOfWork.RegularAccountRepository.GetByAsync(item => item.Email == regularAccounts.Account.Email).Result == null) {
                    unitOfWork.Save();
                    return Ok(regularAccounts);
                } else {
                    Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
                    return BadRequest(new { errorMsg = "This email exist" });
                }
            }
            Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
            return BadRequest(new { errorMsg = "Invalid body" });
        }

        [Authorize(Roles = "regular")]
        [HttpPut]
        public ActionResult<RegularAccount> Put(RegularAccount regularAccount) {
            if (ModelState.IsValid) {
                if (Request.Cookies["user_id"].Length != 0 && Request.Cookies["user_id"] != null) {
                    if (Int64.TryParse(Request.Cookies["user_id"], out long id)) {
                        var regularAccountItem = unitOfWork.RegularAccountRepository.GetByAsync(p => p.Id == id, "subscriptions,commercialaccount,events").Result;

                        regularAccountItem.Name = regularAccount.Name;
                        if (unitOfWork.RegularAccountRepository.GetByAsync(p => p.Email == regularAccount.Email).Result != null) {
                            Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
                            return BadRequest(new { errorMsg = "This email exist" });
                        }
                        regularAccountItem.Email = regularAccount.Email;
                        using SHA256 sha256Hash = SHA256.Create();
                        if (regularAccountItem.Password == regularAccount.Password || regularAccountItem.Password == Hasher.GetHash(sha256Hash, regularAccount.Password) || regularAccount.Password.Length != 0)
                            { } else
                            regularAccountItem.Password = Hasher.GetHash(sha256Hash, regularAccount.Password);
                        unitOfWork.RegularAccountRepository.Update(regularAccountItem);
                        unitOfWork.Save();
                        //return LocalRedirectPermanentPreserveMethod("/");
                        return Ok(regularAccountItem);
                    }
                }
            }

            //return BadRequest(newEvent);
            Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
            return BadRequest(new { errorMsg = "Invalid body" });
        }

        [Authorize(Roles = "regular")]
        [HttpDelete]
        public ActionResult<RegularAccount> Delete() {
            if (ModelState.IsValid) {
                if (Request.Cookies["user_id"].Length != 0 && Request.Cookies["user_id"] != null) {
                    if (Int64.TryParse(Request.Cookies["user_id"], out long id)) {
                        var deletedRegularAccount = unitOfWork.RegularAccountRepository.Delete(id);
                        unitOfWork.Save();
                        //return LocalRedirectPermanentPreserveMethod("/");
                        return Ok(deletedRegularAccount);
                    }
                }
            }
            //return BadRequest(newEvent);
            Response.Headers.Add("XXX-DB-ERROR", "Invalid body");
            return BadRequest(new { errorMsg = "Invalid body" });
        }
    }
}
