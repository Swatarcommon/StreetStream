using Models.Account.Interfaces;
using Models.CustomAttributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Account {
    public class CommercialAccount : IAccount {
        public long Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        [NavigationProperty]
        public ICollection<Event.Event> Events { get; set; }
        public CommercialAccount() {
            Events = new List<Event.Event>();
        }
    }
}
