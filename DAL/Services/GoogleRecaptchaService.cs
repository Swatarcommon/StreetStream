using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Models.Captcha;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace DAL.Services {
    public class GoogleRecaptchaService : IRecaptchaService {
        private readonly HttpClient _httpClient;
        private IConfigurationRoot configuration;

        public GoogleRecaptchaService() {
            _httpClient = new HttpClient();
            _httpClient.BaseAddress = new Uri("https://www.google.com");
            configuration = new ConfigurationBuilder()
              .SetBasePath(Directory.GetCurrentDirectory())
              .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
              .Build();
        }

        public async Task<RecaptchaResponse> Validate(string token) {
            string secret = configuration.GetSection("ReCaptcha").GetSection("SecretKey").Value;
            var response = await _httpClient.PostAsync($"/recaptcha/api/siteverify?secret={secret}&response={token}", null);
            var resultContent = await response.Content.ReadAsStringAsync();
            var captchaResponse = JsonSerializer.Deserialize<RecaptchaResponse>(resultContent);

            return captchaResponse;
        }
    }
}
