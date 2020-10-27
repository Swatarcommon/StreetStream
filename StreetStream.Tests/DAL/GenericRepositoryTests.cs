using DAL;
using Models.Event;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace StreetStream.Tests.DAL {
    public class GenericRepositoryTests : TestBase {
        void AddTest<T>(StreetStreamDbContext context) where T : class {
            var genericRepository = new GenericRepository<T>(context);
            // Act
            var result = genericRepository.GetAsync().Result;

            // Assert
            var model = Assert.IsAssignableFrom<IEnumerable<T>>(result);
            Assert.Equal(context.Events.Count(), model.Count());
        }

        [Fact]
        public void GetAsyncMethodReturnResultWithAllEntities() {
            //Arage
            using var context = InitDbAndGetContext();
            //Act
            AddTest<Event>(context);
            AddTest<Category>(context);
        }
    }
}
