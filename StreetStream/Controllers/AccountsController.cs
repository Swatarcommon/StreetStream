using DAL;
using DAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Account;
using Models.Authenticate;
using Models.Event;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StreetStream.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase {
        private IUserService _userService;
        private UnitOfWork unitOfWork;
        public AccountsController(IUserService userService, UnitOfWork unitOfWork) =>
            (_userService, this.unitOfWork) = (userService, unitOfWork);

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public IActionResult Authenticate([FromBody] AuthenticateRequest model) {
            var response = _userService.Authenticate(model, ipAddress(), Response);
            if (response == null)
                return BadRequest(new { errorMsg = "Username or password is incorrect" });

            setTokenCookie(response.RefreshToken);

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public IActionResult RefreshToken() {
            var refreshToken = Request.Cookies["refreshToken"];
            var response = _userService.RefreshToken(refreshToken, ipAddress(), Response);

            if (response == null)
                return Unauthorized(new { errorMsg = "Invalid token" });

            setTokenCookie(response.RefreshToken);

            return Ok(response);
        }

        [HttpPost("revoke-token")]
        public IActionResult RevokeToken([FromBody] RevokeTokenRequest model) {
            // accept token from request body or cookie
            var token = model.Token ?? Request.Cookies["refreshToken"];

            if (string.IsNullOrEmpty(token))
                return BadRequest(new { errorMsg = "Token is required" });

            var response = _userService.RevokeToken(token, ipAddress());

            if (!response)
                return NotFound(new { errorMsg = "Token not found" });

            return Ok(new { message = "Token revoked" });
        }

        [Authorize]
        [HttpGet("isloggin")]
        public IActionResult IsLoggin() {
            return Ok();
        }

        [Authorize]
        [HttpGet("profile")]
        public IActionResult Profile() {
            if (Request.Cookies["user_id"].Length != 0 && Request.Cookies["user_id"] != null) {
                if (Int64.TryParse(Request.Cookies["user_id"], out long id)) {
                    string role = Request.Cookies["user_role"];
                    if (role == "commercial") {
                        CommercialAccount acc = unitOfWork.CommercialAccountRepository.GetByAsync(account => account.Id == id, "Events,CategoryEvent,Placemark,Category").Result;
                        return Ok(acc);
                    }
                    if (role == "regular") {
                        RegularAccount acc = unitOfWork.RegularAccountRepository.GetByAsync(account => account.Id == id, "subscriptions,commercialaccount,events").Result;
                        foreach (var item in acc.Subscriptions) {
                            List<Event> events = new List<Event>();
                            foreach (var itemE in item.CommercialAccount.Events) {
                                if (itemE.Date >= DateTime.Now)
                                    events.Add(itemE);
                            }
                            item.CommercialAccount.Events = events;
                        }
                        return Ok(acc);
                    }
                    return BadRequest();
                }
            }
            return Unauthorized();
        }

        [Authorize(Roles = "regular")]
        [HttpGet("subscribe/{commercialId}")]
        public IActionResult Subscribe(long commercialId) {
            if (Request.Cookies["user_id"].Length != 0 && Request.Cookies["user_id"] != null) {
                if (Int64.TryParse(Request.Cookies["user_id"], out long id)) {
                    string role = Request.Cookies["user_role"];
                    if (role == "commercial") {
                        return BadRequest();
                    }
                    if (role == "regular") {
                        var regularAccount = unitOfWork.RegularAccountRepository.GetByAsync(account => account.Id == id, "subscriptions").Result;
                        var commercialAccount = unitOfWork.CommercialAccountRepository.GetByAsync(account => account.Id == commercialId).Result;
                        regularAccount.Subscriptions.Add(new Subscriptions() { CommercialAccount = commercialAccount });
                        unitOfWork.RegularAccountRepository.Update(regularAccount);
                        unitOfWork.Save();
                        return Ok(regularAccount);
                    }
                    return BadRequest();
                }
            }
            return Unauthorized();
        }

        [Authorize(Roles = "regular")]
        [HttpGet("unsubscribe/{commercialId}")]
        public IActionResult Unsubscribe(long commercialId) {
            if (Request.Cookies["user_id"].Length != 0 && Request.Cookies["user_id"] != null) {
                if (Int64.TryParse(Request.Cookies["user_id"], out long id)) {
                    string role = Request.Cookies["user_role"];
                    if (role == "commercial") {
                        return BadRequest();
                    }
                    if (role == "regular") {
                        var regularAccount = unitOfWork.RegularAccountRepository.GetByAsync(account => account.Id == id, "subscriptions").Result;
                        var subscibe = regularAccount.Subscriptions.FirstOrDefault(sub => sub.CommercialAccountId == commercialId);
                        if (subscibe != null)
                            regularAccount.Subscriptions.Remove(subscibe);
                        else
                            return BadRequest();
                        unitOfWork.RegularAccountRepository.Update(regularAccount);
                        unitOfWork.Save();
                        return Ok(regularAccount);
                    }
                    return BadRequest();
                }
            }
            return Unauthorized();
        }

        // helper methods
        private void setTokenCookie(string token) {
            var cookieOptions = new CookieOptions {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(7)
            };
            Response.Cookies.Append("refreshToken", token, cookieOptions);
        }

        private string ipAddress() {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }
    }
}
