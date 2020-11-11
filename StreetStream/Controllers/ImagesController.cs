using System.Collections.Generic;
using System.Threading.Tasks;
using DAL;
using DAL.Services;
using Microsoft.AspNetCore.Mvc;
using Models.Account;
using Models.Blobs;

namespace StreetStream.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ImagesController : ControllerBase {
        private readonly IBlobService _blobService;

        public ImagesController(IBlobService blobService) =>
            _blobService = blobService;
        
        [HttpGet]
        public async Task<IActionResult> doGet() {
            return Ok(await _blobService.ListBlobAsync());
        }

        [HttpGet("{name}")]
        public async Task<IActionResult> doGet(string name) {
            var blob = await _blobService.GetBlobAsync(name);
            return File(blob.Content, blob.ContentType);
        }

        [HttpPost]
        public async Task<IActionResult> doPost([FromBody] UploadFileRequest request) {
            await _blobService.UploadFileBlobAsync(request.FilePath, request.FileName);
            return Ok();
        }
    }
}
