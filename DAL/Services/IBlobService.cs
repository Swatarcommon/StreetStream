using Models.Blobs;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Services {
    public interface IBlobService {
        public Task<BlobInfo> GetBlobAsync(string name);
        public Task<IEnumerable<string>> ListBlobAsync();
        public Task UploadFileBlobAsync(string filePathm, string fileName);
        public Task UploadContentBlobAsync(string content, string fileName);
        public Task DeleteBlobAsync(string blobName);
    }
}
