using Models.Account;
using Models.Account.Interfaces;
using Models.Authenticate;
using Models.CustomAttributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;

namespace Models.Account {
    public class RegularAccount : IAccount {
        public long Id { get; init; }
        [MinLength(2)]
        [RegularExpression(@"^((?![\^!@#$*~ <>?]).)((?![\^!@#$*~<>?]).){0,73}((?![\^!@#$*~ <>?]).)$", ErrorMessage = "Invalid username.")]
        public string Name { get; set; }
        [MinLength(3)]
        [RegularExpression(@"^\S+@\S+$", ErrorMessage = "Invalid email.")]
        public string Email { get; set; }
        [MinLength(8)]
        public string Password { get; set; }
        [NavigationProperty]
        public ICollection<Subscriptions> Subscriptions { get; set; }
        [NavigationProperty]
        public List<RefreshToken> RefreshTokens { get; set; }
        public RegularAccount() =>
         (RefreshTokens, Subscriptions) = (new List<RefreshToken>(), new List<Subscriptions>());
    }
}
