using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Account;
using Models.Account.Interfaces;

namespace StreetStream.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ConfirmemailController : ControllerBase {
        [HttpPost]
        public async Task<ActionResult> Post(CommercialAccount account) {
            EmailService emailService = new EmailService();
            string code = Guid.NewGuid().ToString();
            await emailService.SendEmailAsync(account.Email, "Email confirmation", Guid.NewGuid().ToString());
            HttpContext.Response.Cookies.Append("verificationCode", code, new CookieOptions {
                HttpOnly = true,
            });
            return Ok();
        }
    }
}
