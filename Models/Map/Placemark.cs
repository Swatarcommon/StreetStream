using Models.CustomAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace Models.Map {
    [Serializable]
    public class Placemark {
        public long Id { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public long EventId { get; set; }
        [NavigationProperty]
        public Event.Event Event { get; set; }
    }
}
