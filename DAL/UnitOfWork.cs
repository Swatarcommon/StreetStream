using Models.Event;
using Models.Map;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL {
    public class UnitOfWork {
        private StreetStreamDbContext context;
        private GenericRepository<Placemark> placemarkRepository;
        private GenericRepository<Event> eventRepository;
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
        public void Save() {
            context.SaveChanges();
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
