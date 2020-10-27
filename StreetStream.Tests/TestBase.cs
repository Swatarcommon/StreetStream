using DAL;
using Microsoft.EntityFrameworkCore;
using Models.Event;
using System.Text.Json;
using System;
using System.Collections.Generic;
using System.IO;

namespace StreetStream.Tests {
    public class TestBase {
        public StreetStreamDbContext GetDbContext() {
            var builder = new DbContextOptionsBuilder<StreetStreamDbContext>()
                .EnableSensitiveDataLogging()
                .UseInMemoryDatabase(Guid.NewGuid().ToString());
            var context = new StreetStreamDbContext(builder.Options);
            context.Database.EnsureCreated();
            return context;
        }

        public StreetStreamDbContext InitDbAndGetContext() {
            var context = GetDbContext();
            var st = Environment.CurrentDirectory;
            var path = st.Split("\\bin\\");
            List<Event> mockEvents = new List<Event>();
            List<Category> mockCategories = new List<Category>();
            mockEvents = JsonSerializer.Deserialize<List<Event>>(File.ReadAllText(path[0] + "\\Mock\\MOCK_EVENTS.json"));
            mockCategories = JsonSerializer.Deserialize<List<Category>>(File.ReadAllText(path[0] + "\\Mock\\MOCK_CATEGORIES.json"));
            context.Events.AddRange(mockEvents);
            context.Categories.AddRange(mockCategories);
            context.SaveChanges();
            return context;
        }
    }
}
