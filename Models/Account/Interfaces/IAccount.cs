using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Text;

namespace Models.Account.Interfaces {
    public interface IAccount {
        long Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
