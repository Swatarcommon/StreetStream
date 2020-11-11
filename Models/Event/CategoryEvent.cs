using Models.CustomAttributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Event {
    public class CategoryEvent {
        public long EventId { get; init; }
        public long CategoryId { get; set; }
        [NavigationProperty(true)]
        public Event Event { get; set; }
        [NavigationProperty(true)]
        public Category Category { get; set; }
    }
}
