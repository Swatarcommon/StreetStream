using DAL;
using DAL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models.Account;
using Models.Account.Interfaces;
using Models.Authenticate;
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
            var response = _userService.Authenticate(model, ipAddress(), HttpContext);
            if (response == null)
                return BadRequest(new { errorMsg = "Username or password is incorrect" });

            setTokenCookie(response.RefreshToken);

            return Ok(response);
        }

        [AllowAnonymous]
        [HttpPost("refresh-token")]
        public IActionResult RefreshToken() {
            var refreshToken = Request.Cookies["refreshToken"];
            var response = _userService.RefreshToken(refreshToken, ipAddress());

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

        [HttpGet("profile")]
        public IActionResult Profile() {
            if (HttpContext.Session.Keys.Contains("user_id")) {
                if (Int64.TryParse(HttpContext.Session.GetString("user_id"), out long id)) {
                    string role = HttpContext.Session.GetString("user_role");
                    if (role == "commercial") {
                        return Ok(unitOfWork.CommercialAccountRepository.GetAsync(account => account.Id == id, "Events,CategoryEvent,Placemark,Category").Result);
                    }
                    if (role == "regular") {
                        return Ok(unitOfWork.CommercialAccountRepository.GetAsync(account => account.Id == id, "Events,CategoryEvent,Placemark,Category").Result);
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
