﻿using Models.Account;
using Models.CustomAttributes;
using Models.Map;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;

namespace Models.Event {
    public class Event {
        public Event() =>
            CategoryEvent = new List<CategoryEvent>();
        public long Id { get; init; }
        [MinLength(3)]
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Duration { get; set; }
        public string Description { get; set; }
        [NavigationProperty]
        public Placemark Placemark { get; set; }
        [NavigationProperty]
        public CommercialAccount CommercialAccount { get; set; }
        [NavigationProperty]
        public ICollection<CategoryEvent> CategoryEvent { get; set; }
    }
}
