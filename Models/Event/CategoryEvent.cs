using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Event {
    public class CategoryEvent {
        public long EventId { get; set; }
        public long CategoryId { get; set; }
        public Event Event { get; set; }
        public Category Category { get; set; }
    }
}
