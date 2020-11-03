using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Blobs {
    public class UploadFileRequest {
        public string FilePath {
            get; set;
        }
        public string FileName {
            get; set;
        }
    }
}
