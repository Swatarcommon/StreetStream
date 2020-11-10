using Microsoft.AspNetCore.Http;
using Models.Captcha;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Services {
    public interface IRecaptchaService {
        Task<RecaptchaResponse> Validate(string token);
    }
}
