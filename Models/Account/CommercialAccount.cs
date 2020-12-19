using Models.Account.Interfaces;
using Models.Authenticate;
using Models.CustomAttributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;

namespace Models.Account {
    public class CommercialAccount : IAccount {
        public long Id { get; init; }
        [MinLength(2)]
        [RegularExpression(@"^((?![\^!@#$*~ <>?]).)((?![\^!@#$*~<>?]).){0,73}((?![\^!@#$*~ <>?]).)$", ErrorMessage = "Invalid username.")]
        public string Name { get; set; }
        [RegularExpression(@"^\S+@\S+$", ErrorMessage = "Invalid email.")]
        public string Email { get; set; }
        [MinLength(8)]
        public string Password { get; set; }
        [MinLength(4)]
        [RegularExpression(@"^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*", ErrorMessage = "Invalid telephone.")]
        public string Telephone { get; set; }
        [MinLength(1)]
        public string Description { get; set; }
        [NavigationProperty(true)]
        public ICollection<Event.Event> Events { get; set; }
        [NavigationProperty]
        public List<RefreshToken> RefreshTokens { get; set; }
        [NavigationProperty]
        public ICollection<Subscriptions> Subscribers { get; set; }

        public CommercialAccount() =>
            (Events, RefreshTokens, Subscribers) = (new List<Event.Event>(), new List<RefreshToken>(), new List<Subscriptions>());
    }
}
