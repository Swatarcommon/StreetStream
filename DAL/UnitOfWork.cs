using Microsoft.EntityFrameworkCore;
using Models.Account;
using Models.Event;
using Models.Map;
using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;

namespace DAL {
    public class UnitOfWork {
        private StreetStreamDbContext context;
        private GenericRepository<Placemark> placemarkRepository;
        private GenericRepository<Event> eventRepository;
        private GenericRepository<Category> categoryRepository;
        private GenericRepository<CommercialAccount> commercialAccountRepository;
        private GenericRepository<RegularAccount> regularAccountRepository;
        private GenericRepository<Image> imageRepository;

        public UnitOfWork(StreetStreamDbContext context) {
            this.context = context;
        }

        public GenericRepository<Placemark> PlacemarkRepository {
            get {
                if (this.placemarkRepository == null) {
                    this.placemarkRepository = new GenericRepository<Placemark>(context);
                }
                return placemarkRepository;
            }
        }

        public GenericRepository<Event> EventRepository {
            get {
                if (this.eventRepository == null) {
                    this.eventRepository = new GenericRepository<Event>(context);
                }
                return eventRepository;
            }
        }

        public GenericRepository<Category> CategoryRepository {
            get {
                if (this.categoryRepository == null) {
                    this.categoryRepository = new GenericRepository<Category>(context);
                }
                return categoryRepository;
            }
        }

        public GenericRepository<CommercialAccount> CommercialAccountRepository {
            get {
                if (this.commercialAccountRepository == null) {
                    this.commercialAccountRepository = new GenericRepository<CommercialAccount>(context);
                }
                return commercialAccountRepository;
            }
        }

        public GenericRepository<RegularAccount> RegularAccountRepository {
            get {
                if (this.regularAccountRepository == null) {
                    this.regularAccountRepository = new GenericRepository<RegularAccount>(context);
                }
                return regularAccountRepository;
            }
        }

        public GenericRepository<Image> ImageRepository {
            get {
                if (this.imageRepository == null) {
                    this.imageRepository = new GenericRepository<Image>(context);
                }
                return imageRepository;
            }
        }

        public bool Save(out string message) {
            try {
                context.SaveChanges();
                message = "Success";
                return true;
            } catch (DbUpdateException e) {
                var exceptionMessage = e.InnerException.Message;
                if (exceptionMessage != null) {
                    var pattern = new Regex("\r\n");
                    message = pattern.Replace(exceptionMessage, " ");
                } else {
                    message = "Uknown error";
                }
                return false;
            }
        }

        //private bool disposed = false;

        //protected virtual void Dispose(bool disposing) {
        //    if (!this.disposed) {
        //        if (disposing) {
        //            context.Dispose();
        //        }
        //    }
        //    this.disposed = true;
        //}

        //public void Dispose() {
        //    Dispose(true);
        //    GC.SuppressFinalize(this);
        //}
    }
}
