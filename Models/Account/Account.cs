using Models.Account.Interfaces;
using Models.Authenticate;
using Models.CustomAttributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Account {
    public class Account : IAccount {
        public Account() =>
          (RefreshTokens) = (new List<RefreshToken>());
        public long Id { get; init; }
        [RegularExpression(@"^\S+@\S+$", ErrorMessage = "Invalid email.")]
        public string Email { get; set; }
        [MinLength(8)]
        public string Password { get; set; }
        [NavigationProperty]
        public List<RefreshToken> RefreshTokens { get; set; }
    }
}
