using DAL;
using Microsoft.AspNetCore.Mvc;
using Models.Event;
using StreetStream.Controllers;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace StreetStream.Tests.Controllers {
    public class EventsControllerTests : TestBase {
        [Fact]
        public void GetAsyncMethodReturnResultWithAllEvents() {
            // Arrange
            using var context = InitDbAndGetContext();
            var unitOfWork = new UnitOfWork(context);
            EventsController eventsController = new EventsController(unitOfWork);

            // Act
            var result = eventsController.Get();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var model = Assert.IsAssignableFrom<IEnumerable<Event>>(okResult.Value);
            Assert.Equal(context.Events.Count(), model.Count());
        }
    }
}
