using Models.Account.Interfaces;
using Models.Authenticate;
using Models.CustomAttributes;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Models.Account {
    public class CommercialAccount : IAccount {
        public long Id { get; init; }
        public string Email { get; set; }
        public string Password { get; set; }
        [NavigationProperty(true)]
        public ICollection<Event.Event> Events { get; set; }
        [NavigationProperty]
        public List<RefreshToken> RefreshTokens { get; set; }

        public CommercialAccount() =>
            (Events, RefreshTokens) = (new List<Event.Event>(), new List<RefreshToken>());
    }
}
