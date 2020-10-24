using Models.CustomAttributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Event {
    public class CategoryEvent {
        public long EventId { get; set; }
        public long CategoryId { get; set; }
        [NavigationProperty(typeof(CategoryEvent))]
        public Event Event { get; set; }
        [NavigationProperty(typeof(CategoryEvent))]
        public Category Category { get; set; }
    }
}
