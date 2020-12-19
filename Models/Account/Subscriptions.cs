using Models.CustomAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Account {
    public class Subscriptions {
        public long RegularAccountId { get; init; }
        public long CommercialAccountId { get; set; }
        [NavigationProperty(true)]
        public RegularAccount RegularAccount { get; set; }
        [NavigationProperty(true)]
        public CommercialAccount CommercialAccount { get; set; }
    }
}
