using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Models.Account;
using Models.Account.Interfaces;
using Models.Authenticate;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Services {
    public interface IUserService {
        AuthenticateResponse Authenticate(AuthenticateRequest model, string ipAddress, HttpContext context);
        AuthenticateResponse RefreshToken(string token, string ipAddress);
        bool RevokeToken(string token, string ipAddress);
    }

    public class UserService : IUserService {
        private UnitOfWork _unitOfWork;
        private IConfigurationRoot configuration;
        public UserService(UnitOfWork unitOfWork) =>
            (_unitOfWork, configuration) = (unitOfWork, new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory())
                                                        .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                                                        .Build());

        public AuthenticateResponse Authenticate(AuthenticateRequest model, string ipAddress, HttpContext context) {
            IAccount account = _unitOfWork.CommercialAccountRepository.GetAsync(x => x.Email == model.Email && x.Password == model.Password).Result.FirstOrDefault();
            // return null if user not found
            if (account == null) {
                account = _unitOfWork.RegularAccountRepository.GetAsync(x => x.Email == model.Email && x.Password == model.Password).Result.FirstOrDefault();
                if (account == null)
                    return null;
            }

            // authentication successful so generate jwt and refresh tokens
            var jwtToken = generateJwtToken(account);
            var refreshToken = generateRefreshToken(ipAddress);

            // save refresh token
            account.RefreshTokens.Add(refreshToken);
            if (account is CommercialAccount) {
                _unitOfWork.CommercialAccountRepository.Update((CommercialAccount)account);
                context.Session.SetString("user_id", account.Id.ToString());
                context.Session.SetString("user_role", "commercial");
            }
            if (account is RegularAccount) {
                _unitOfWork.RegularAccountRepository.Update((RegularAccount)account);
                context.Session.SetString("user_id", account.Id.ToString());
                context.Session.SetString("user_role", "regular");
            }
            _unitOfWork.Save();

            return new AuthenticateResponse(account, jwtToken, refreshToken.Token, account.GetType().Name.ToUpper());
        }

        public AuthenticateResponse RefreshToken(string token, string ipAddress) {
            IAccount account = _unitOfWork.CommercialAccountRepository.GetAsync(u => u.RefreshTokens.Any(t => t.Token == token)).Result.FirstOrDefault();
            // return null if user not found
            if (account == null) {
                account = _unitOfWork.RegularAccountRepository.GetAsync(u => u.RefreshTokens.Any(t => t.Token == token)).Result.FirstOrDefault();
                if (account == null)
                    return null;
            }

            var refreshToken = account.RefreshTokens.Single(x => x.Token == token);

            // return null if token is no longer active
            if (!refreshToken.IsActive)
                return null;

            // replace old refresh token with a new one and save
            var newRefreshToken = generateRefreshToken(ipAddress);
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;
            refreshToken.ReplacedByToken = newRefreshToken.Token;
            account.RefreshTokens.Add(newRefreshToken);
            if (account is CommercialAccount) {
                _unitOfWork.CommercialAccountRepository.Update((CommercialAccount)account);
            }
            if (account is RegularAccount) {
                _unitOfWork.RegularAccountRepository.Update((RegularAccount)account);
            }
            _unitOfWork.Save();

            // generate new jwt
            var jwtToken = generateJwtToken(account);

            return new AuthenticateResponse(account, jwtToken, newRefreshToken.Token, account.GetType().ToString());
        }

        public bool RevokeToken(string token, string ipAddress) {
            IAccount account = _unitOfWork.CommercialAccountRepository.GetAsync(u => u.RefreshTokens.Any(t => t.Token == token)).Result.FirstOrDefault();
            // return null if user not found
            if (account == null) {
                account = _unitOfWork.RegularAccountRepository.GetAsync(u => u.RefreshTokens.Any(t => t.Token == token)).Result.FirstOrDefault();
                if (account == null)
                    return false;
            }
            var refreshToken = account.RefreshTokens.Single(x => x.Token == token);

            // return false if token is not active
            if (!refreshToken.IsActive)
                return false;

            // revoke token and save
            refreshToken.Revoked = DateTime.UtcNow;
            refreshToken.RevokedByIp = ipAddress;
            if (account is CommercialAccount) {
                _unitOfWork.CommercialAccountRepository.Update((CommercialAccount)account);
            }
            if (account is RegularAccount) {
                _unitOfWork.RegularAccountRepository.Update((RegularAccount)account);
            }
            _unitOfWork.Save();

            return true;
        }

        // helper methods

        private string generateJwtToken(IAccount account) {
            Dictionary<Type, string> accountRoles = new Dictionary<Type, string>() {
                { typeof(CommercialAccount), "commercial" },
                { typeof(RegularAccount), "regular"}
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(configuration.GetSection("JWT_Secret").Value);
            var tokenDescriptor = new SecurityTokenDescriptor {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, account.Email.ToString()),
                    new Claim(ClaimTypes.Role, accountRoles.GetValueOrDefault(account.GetType()))
                }),
                Expires = DateTime.UtcNow.AddMinutes(15),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private RefreshToken generateRefreshToken(string ipAddress) {
            using (var rngCryptoServiceProvider = new RNGCryptoServiceProvider()) {
                var randomBytes = new byte[64];
                rngCryptoServiceProvider.GetBytes(randomBytes);
                return new RefreshToken {
                    Token = Convert.ToBase64String(randomBytes),
                    Expires = DateTime.UtcNow.AddDays(7),
                    Created = DateTime.UtcNow,
                    CreatedByIp = ipAddress
                };
            }
        }
    }
}