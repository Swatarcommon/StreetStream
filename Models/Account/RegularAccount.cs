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
    public class RegularAccount : Account {
        public string Name { get; set; }
        [NavigationProperty]
        public ICollection<Subscriptions> Subscriptions { get; set; }
        public RegularAccount() =>
         (Subscriptions) = (new List<Subscriptions>());
    }
}
