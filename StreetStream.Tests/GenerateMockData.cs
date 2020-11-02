using Bogus;
using Models.Account;
using Models.Event;
using Models.Map;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;

namespace StreetStream.Tests {

    public static class GenerateMockData {
        private static Faker<Event> FakeDataEvent { get; } = new Faker<Event>().RuleFor(p => p.Name, f => f.Name.JobType())
                                                                         .RuleFor(p => p.Date, f => f.Date.Past(20))
                                                                         .RuleFor(p => p.Duration, f => f.Date.Timespan())
                                                                         .RuleFor(p => p.Placemark, f => new Placemark())
                                                                         .RuleFor(p => p.CommercialAccount, f => new CommercialAccount())
                                                                         .RuleFor(p => p.CategoryEvent, f => new List<CategoryEvent>());
        private static Faker<Category> FakeDataCategory { get; } = new Faker<Category>().RuleFor(p => p.Name, f => f.Name.JobDescriptor())
                                                                         .RuleFor(p => p.CategoryEvent, f => new List<CategoryEvent>());
        private static Faker<CommercialAccount> FakeDataCommercialAccount { get; } = new Faker<CommercialAccount>().RuleFor(p => p.Email, f => f.Internet.Email())
                                                                  .RuleFor(p => p.Password, f => f.Internet.Password())
                                                                  .RuleFor(p => p.Events, f => new List<Event>());

        public static void GenerateEven() {
            var st = Environment.CurrentDirectory;
            var path = st.Split("\\bin\\");
            var mockData = FakeDataEvent.Generate(1000).ToList();
            var json = JsonSerializer.Serialize<List<Event>>(mockData);
            File.WriteAllText(path[0] + "\\Mock\\MOCK_EVENTS.json", json);
        }

        public static void GenerateCategory() {
            var st = Environment.CurrentDirectory;
            var path = st.Split("\\bin\\");
            var mockData = FakeDataCategory.Generate(1000).ToList();
            var json = JsonSerializer.Serialize<List<Category>>(mockData);
            File.WriteAllText(path[0] + "\\Mock\\MOCK_CATEGORIES.json", json);
        }

        public static void GenerateCommercialAccount() {
            var st = Environment.CurrentDirectory;
            var path = st.Split("\\bin\\");
            var mockData = FakeDataCategory.Generate(1000).ToList();
            var json = JsonSerializer.Serialize<List<Category>>(mockData);
            File.WriteAllText(path[0] + "\\Mock\\MOCK_COMMERCIAL_ACCOUNTS.json", json);
        }
    }
}
