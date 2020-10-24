using Models.CustomAttributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models.Event {
    public class Category {
        public Category() {
            CategoryEvent = new List<CategoryEvent>();
        }
        public long Id { get; set; }
        [MinLength(1)]
        public string Name { get; set; }
        [NavigationProperty(typeof(Category))]
        public ICollection<CategoryEvent> CategoryEvent { get; set; }
    }
}
