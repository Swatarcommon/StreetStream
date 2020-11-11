using System;
using System.Collections.Generic;
using System.Text;

namespace Models.CustomAttributes {
    //Attribute needed to mark some properties, that used to navigate(own navigate system) in the requests
    [AttributeUsage(AttributeTargets.Property, Inherited = false)]
    public class NavigationPropertyAttribute : Attribute {

        //Not used anywhere yet, but may be needed somewhere
        public Type EndedNavType { get; set; }
        public bool IsManyToMany { get; set; }

        public NavigationPropertyAttribute() { }

        public NavigationPropertyAttribute(Type obj) =>
            (EndedNavType) = (obj);

        public NavigationPropertyAttribute(bool isManyToMany) =>
            (IsManyToMany) = (isManyToMany);

        public NavigationPropertyAttribute(Type obj, bool isManyToMany) =>
            (EndedNavType, IsManyToMany) = (obj, isManyToMany);
    }
}
