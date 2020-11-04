using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.CompilerServices;
using System.Text;

namespace Models.Account.Interfaces {
    public interface IAccount {
        long Id { get; set; }
        string Email { get; set; }
        string Password { get; set; }
    }
}
