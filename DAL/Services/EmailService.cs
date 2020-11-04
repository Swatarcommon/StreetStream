using MimeKit;
using MailKit.Net.Smtp;
using System.Text;
using System.Threading.Tasks;


namespace DAL.Services {
    public class EmailService {
        public async Task SendEmailAsync(string email, string subject, string message) {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("StreetStream", "streatstream@yandex.ru"));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Text) {
                Text = message
            };

            using (var client = new SmtpClient()) {
                await client.ConnectAsync("smtp.yandex.ru", 25, false);
                await client.AuthenticateAsync("streatstream@yandex.ru", "hfzffpcgcbsojrfo");
                await client.SendAsync(emailMessage);

                await client.DisconnectAsync(true);
            }
        }
    }
}
