using Microsoft.EntityFrameworkCore;
using Models.CustomAttributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.Json.Serialization;

namespace DAL {
    public static class DbContextHelper {
        public static Func<IQueryable<T>, IQueryable<T>> GetNavigations<T>(string includeList) where T : class {
            var type = typeof(T);
            List<string> navigationProperties = new List<string>();
            var includer = includeList.ToUpper().Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries).ToList();
            //get navigation properties
            GetNavigationProperties(type, type, string.Empty, navigationProperties, includer);

            Func<IQueryable<T>, IQueryable<T>> includes = (query => {
                return navigationProperties.Aggregate(query, (current, inc) => current.Include(inc));
            });

            return includes;
        }

        private static void GetNavigationProperties(Type baseType, Type type, string parentPropertyName, IList<string> accumulator, IList<string> includer) {
            //get navigation properties
            var properties = type.GetProperties();
            var navigationPropertyInfoList = properties.Where(p => p.IsDefined(typeof(NavigationPropertyAttribute)));

            foreach (PropertyInfo prop in navigationPropertyInfoList) {
                if (includer.Any(i => i == prop.Name.ToUpper())) {
                    var propertyType = prop.PropertyType;
                    var elementType = propertyType.GetTypeInfo().IsGenericType ? propertyType.GetGenericArguments()[0] : propertyType;

                    //Prepare navigation property in {parentPropertyName}.{propertyName} format and push into accumulator
                    var properyName = string.Format("{0}{1}{2}", parentPropertyName, string.IsNullOrEmpty(parentPropertyName) ? string.Empty : ".", prop.Name);
                    accumulator.Add(properyName);

                    //Skip recursion of propert has JsonIgnore attribute or current property type is the same as baseType
                    //And stop getting include property cus its will lead to StackOverflow exception
                    var isJsonIgnored = prop.IsDefined(typeof(JsonIgnoreAttribute));
                    var attrs = prop.GetCustomAttributes();
                    foreach (NavigationPropertyAttribute attr in attrs) {
                        if (!isJsonIgnored && elementType != baseType && attr.EndedNavType != type) {
                            GetNavigationProperties(baseType, elementType, properyName, accumulator, includer);
                        }
                    }
                }
            }
        }
    }
}
