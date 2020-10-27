using DAL;
using Microsoft.EntityFrameworkCore;
using Models.Account;
using Models.Event;
using Models.Map;
using System.Text.Json;
using System;
using System.Collections.Generic;
using System.Text;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Bogus;
using Bogus.DataSets;
using System.Linq;

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

        //Generate Mock data
        public static Faker<Event> FakeData { get; } =
        new Faker<Event>()
            .RuleFor(p => p.Name, f => f.Name.JobType())
            .RuleFor(p => p.Date, f => f.Date.Past(20))
            .RuleFor(p => p.Duration, f => f.Date.Timespan())
            .RuleFor(p => p.Placemark, f => new Placemark())
            .RuleFor(p => p.CommercialAccount, f => new CommercialAccount())
            .RuleFor(p => p.CategoryEvent, f => new List<CategoryEvent>());

        public StreetStreamDbContext InitDbAndGetContext() {
            var context = GetDbContext();
            var st = Environment.CurrentDirectory;
            var path = st.Split("\\bin\\");
            //var testEvents = FakeData.Generate(1000).ToList();
            //var json = JsonSerializer.Serialize<List<Event>>(testEvents);
            //File.WriteAllText(path[0] + "\\Mock\\MOCK_EVENTS.json", json);
            List<Event> mockEvents = new List<Event>();
            mockEvents = JsonSerializer.Deserialize<List<Event>>(File.ReadAllText(path[0] + "\\Mock\\MOCK_EVENTS.json"));
            context.Events.AddRange(mockEvents);
            context.SaveChanges();
            return context;
        }
    }
}
