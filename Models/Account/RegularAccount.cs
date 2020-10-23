using Models.Account.Interfaces;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Models.Account {
    public class RegularAccount : IAccount {
        public long Id { get; set; }
        [MinLength(3)]
        public string Email { get; set; }
        [MinLength(8)]
        public string Password { get; set; }
    }
}
