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

        /// <summary>
        /// Get Entities that selected by many params especially "includingProps" param wich link entity-dependent props.
        /// </summary>
        public async Task<IEnumerable<TEntity>> GetAsync(Expression<Func<TEntity, bool>> predicate,
            string includingProps = "", int offset = 0, string orderByFields = "", string desc = "false") {
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = DbContextHelper.GetNavigations<TEntity>(includingProps);
            IQueryable<TEntity> query = dbSet;

            if (predicate != null) {
                query = query.Where(predicate);
            }

            if (offset != 0)
                query = query.Skip(offset);

            if (includes != null) {
                query = includes(query);
            }

            if (!string.IsNullOrEmpty(orderByFields)) {
                var orderedEntities = OrderByEntities(query, orderByFields.ToUpper(), desc.ToUpper());
                if (orderedEntities == null)
                    return null;
                return orderedEntities;
            }
            var entity = await query.ToListAsync();
            return entity;
        }

        /// <summary>
        /// Get Entities that selected by some "predicate"(c=>c.id == id for example) especially "includingProps" param wich link entity-dependent props.
        /// </summary>
        public async Task<TEntity> GetByAsync(Expression<Func<TEntity, bool>> predicate, string includingProps) {
            Func<IQueryable<TEntity>, IQueryable<TEntity>> includes = DbContextHelper.GetNavigations<TEntity>(includingProps);
            IQueryable<TEntity> query = dbSet;
            if (includes != null) {
                query = includes(query);
            }

            var entity = await query.FirstOrDefaultAsync(predicate);
            return entity;
        }

        private IOrderedEnumerable<TEntity> OrderByEntities(IQueryable<TEntity> query, string orderByFields, string desc) {
            var orderings = CreateOrderingList(orderByFields);
            if (orderings.Count == 0)
                return null;
            if (desc == "FALSE") {
                var orderedEntity = query.OrderBy(orderings.First());
                foreach (var orderByItem in orderings.Skip(1)) {
                    orderedEntity = orderedEntity.ThenBy(orderByItem);
                }
                return orderedEntity;
            } else {
                var orderedEntity = query.OrderByDescending(orderings.First());
                foreach (var orderByItem in orderings.Skip(1)) {
                    orderedEntity = orderedEntity.ThenByDescending(orderByItem);
                }
                return orderedEntity;
            }
        }

        private List<Func<TEntity, IComparable>> CreateOrderingList(string orderByFields) {
            var ordering = new List<Func<TEntity, IComparable>>();
            var orderby = orderByFields.Split(new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries);
            Type type = typeof(TEntity);
            PropertyInfo[] properties = type.GetProperties();
            foreach (var property in properties) {
                foreach (var orderName in orderby) {
                    if (property.Name.ToUpper() == orderName) {
                        if (!type.GetProperty(property.Name).PropertyType.IsClass)
                            ordering.Add(x => (IComparable)x.GetType().GetProperty(property.Name).GetValue(x));
                    }
                }
            }
            return ordering;
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
