using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Models.Captcha {
    public record  RecaptchaResponse {
        [JsonPropertyName("success")]
        public bool Success { get; init; }

        [JsonPropertyName("error-codes")]
        public List<string> ErrorCodes { get; init; }

        public void Deconstruct(out bool Success, out List<string> ErrorCodes) {
            Success = this.Success;
            ErrorCodes = this.ErrorCodes;
        }
    }
}
