using Models.Authenticate;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json.Serialization;

namespace Models.Account.Interfaces {
    public interface IAccount {
        long Id { get; init; }
        public string Email { get; set; }
        public string Password { get; set; }
        [JsonIgnore]
        public List<RefreshToken> RefreshTokens { get; set; }
    }
}
