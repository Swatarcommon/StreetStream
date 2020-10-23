using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Text;
using System.Runtime;
using Microsoft.EntityFrameworkCore.Query;
using System.Collections;
using System.Threading.Tasks;

namespace DAL {
    public class GenericRepository<TEntity> where TEntity : class {
        internal StreetStreamDbContext context;
        internal DbSet<TEntity> dbSet;

        public GenericRepository(StreetStreamDbContext context) {
            this.context = context;
            this.dbSet = context.Set<TEntity>();
        }

        public virtual IEnumerable<TEntity> Get(
          int offset = 0,
          string orderByFields = "",
          string desc = "",
          Expression<Func<TEntity, bool>> filter = null,
          Func<IQueryable<TEntity>, IIncludableQueryable<TEntity, object>> include = null) {
            IQueryable<TEntity> query = dbSet;

            if (filter != null) {
                query = query.Where(filter);
            }

            if (include != null) {
                query = include(query);
            }
            if (offset != 0)
                query = query.Skip(offset);

            if (!string.IsNullOrEmpty(orderByFields)) {
                var queryList = OrderByEntities(query, orderByFields, desc)?.ToList();
                if (queryList == null)
                    return null;
                if (desc == "true")
                    queryList.Reverse();
                return queryList;
            } else
                return query.ToList();
        }

        private IOrderedEnumerable<TEntity> OrderByEntities(IQueryable<TEntity> query, string orderByFields, string desc) {
            var orderings = CreateOrderingList(orderByFields);
            if (orderings.Count == 0)
                return null;
            var orderedEntity = query.OrderBy(orderings.First());
            foreach (var orderByItem in orderings.Skip(1)) {
                orderedEntity = orderedEntity.ThenBy(orderByItem);
            }
            return orderedEntity;
        }

        private List<Func<TEntity, IComparable>> CreateOrderingList(string orderByFields) {
            var ordering = new List<Func<TEntity, IComparable>>();
            var orderby = orderByFields.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            Type type = typeof(TEntity);
            PropertyInfo[] properties = type.GetProperties();
            foreach (var property in properties) {
                foreach (var orderName in orderby) {
                    if (property.Name == orderName) {
                        if (!type.GetProperty(property.Name).PropertyType.IsClass)
                            ordering.Add(x => (IComparable)x.GetType().GetProperty(property.Name).GetValue(x));
                    }
                }
            }
            return ordering;
        }

        //// TODO:  not working (dont know how to realize this Dynamic entity navigation shit)
        //private TEntity IncludeEntities(TEntity query, string includebleEntities) {
            
        //    var entites = null;
        //    return entites;
        //}

        //private List<Func<IEnumerable<TEntity>, IIncludableQueryable<TEntity, object>>> GetIncludebleEntities(string includebleEntities) {
        //    var ordering = new List<Func<IEnumerable<TEntity>, IIncludableQueryable<TEntity, object>>>();
        //    var includebleItems = includebleEntities.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
        //    Type type = typeof(TEntity);
        //    PropertyInfo[] properties = type.GetProperties();
        //    foreach (var property in properties) {
        //        foreach (var includeName in includebleItems) {
        //            if (property.Name == includeName) {
        //                ordering.Add(x => (IIncludableQueryable<TEntity, object>)x.GetType().GetProperty(property.Name).GetValue(x));
        //            }
        //        }
        //    }
        //    return ordering;
        //}

        ////TODO: Depricated method, but more simple than currently
        //public virtual TEntity GetByID(object id) {
        //    var item = dbSet.Find(id);
        //    return null;
        //}

        public async Task<TEntity> GetAsync(Expression<Func<TEntity, bool>> predicate) {
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = DbContextHelper.GetNavigations<TEntity>();
            IQueryable<TEntity> query = dbSet;
            if (includes != null) {
                query = includes(query);
            }

            var entity = await query.FirstOrDefaultAsync(predicate);
            return entity;
        }

        public virtual void Insert(TEntity entity) {
            dbSet.Add(entity);
        }

        public virtual TEntity Delete(object id) {
            TEntity entityToDelete = dbSet.Find(id);
            Delete(entityToDelete);
            return entityToDelete;
        }

        public virtual TEntity Delete(TEntity entityToDelete) {
            if (context.Entry(entityToDelete).State == EntityState.Detached) {
                dbSet.Attach(entityToDelete);
            }
            dbSet.Remove(entityToDelete);
            return entityToDelete;
        }

        public virtual void Update(TEntity entityToUpdate) {
            dbSet.Attach(entityToUpdate);
            context.Entry(entityToUpdate).State = EntityState.Modified;
        }
    }
}
