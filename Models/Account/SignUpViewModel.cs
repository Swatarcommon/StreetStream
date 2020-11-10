using Models.Account.Interfaces;
using Models.Captcha;
using System;
using System.Collections.Generic;
using System.Text;

namespace Models.Account {
    public class SignUpViewModel<T> where T : IAccount {
        public T Account { get; set; }
        public string Token { get; set; }
    }
}
