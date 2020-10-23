using System;
using System.Collections.Generic;
using System.Text;

namespace Models.CustomAttributes {
    [AttributeUsage(AttributeTargets.Property, Inherited = false)]
    public class NavigationPropertyAttribute : Attribute {
        public NavigationPropertyAttribute() {
        }
    }
}
