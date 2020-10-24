using System;
using System.Collections.Generic;
using System.Text;

namespace Models.CustomAttributes {
    [AttributeUsage(AttributeTargets.Property, Inherited = false)]
    public class NavigationPropertyAttribute : Attribute {
        public Type EndedNavType { get; set; }
        public NavigationPropertyAttribute() {
        }
        public NavigationPropertyAttribute(Type obj) {
            EndedNavType = obj;
        }
    }
}
