using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace StreetStream.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacemarksController : ControllerBase
    {
        [HttpGet]
        public ActionResult Get() {
            return Ok();
        }

        [HttpGet("{id}")]
        public ActionResult Get(int id) {
            return Ok();
        }
    }
}