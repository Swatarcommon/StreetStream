using DAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Models.Account;
using Models.Event;
using Models.Map;
using Moq;
using StreetStream.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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
            var model = Assert.IsAssignableFrom<IEnumerable<Event>>(result);
            Assert.Equal(context.Events.Count(), model.Count());
        }
    }
}
