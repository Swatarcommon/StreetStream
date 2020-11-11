using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Account {
    public class Image {
        public long Id { get; init; }

        public string Href { get; set; }
        public string Format { get; set; }
    }
}
