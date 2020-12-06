using Models.Account.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models.Authenticate {
    public class AuthenticateResponse {
        public long Id { get; set; }
        public string Email { get; set; }
        public string Type { get; set; }
        public string JwtToken { get; set; }

        [JsonIgnore] // refresh token is returned in http only cookie
        public string RefreshToken { get; set; }

        public AuthenticateResponse(IAccount account, string jwtToken, string refreshToken, string type) {
            Id = account.Id;
            Email = account.Email;
            Type = type;
            JwtToken = jwtToken;
            RefreshToken = refreshToken;
        }
    }
}
