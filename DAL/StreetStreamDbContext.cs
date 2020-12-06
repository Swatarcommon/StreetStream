using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Models.Account;
using Models.Authenticate;
using Models.Event;
using Models.Map;
using System.IO;

namespace DAL {
    public class StreetStreamDbContext : DbContext {
        private IConfigurationRoot configuration;
        public StreetStreamDbContext(DbContextOptions<StreetStreamDbContext> options)
          : base(options) {
            Database.EnsureCreated();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
            configuration = new ConfigurationBuilder()
               .SetBasePath(Directory.GetCurrentDirectory())
               .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
               .Build();
            if (!optionsBuilder.IsConfigured) {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer(configuration.GetConnectionString("DefaultConnection"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Event>(entity => {
                entity.ToTable("Events")
                      .HasKey(evt => evt.Id);
                entity.HasIndex(evt => evt.Id);
                entity.HasOne(cmrAcc => cmrAcc.CommercialAccount)
                      .WithMany(evt => evt.Events);
                entity.HasOne(plcmrk => plcmrk.Placemark)
                      .WithOne(evt => evt.Event)
                      .HasForeignKey<Placemark>(plc => plc.EventId);
                entity.Property(evt => evt.Name)
                      .IsRequired()
                      .HasMaxLength(255);
                entity.Property(evt => evt.Date)
                      .IsRequired();
                entity.Property(evt => evt.Duration)
                      .IsRequired();
            });


            modelBuilder.Entity<Category>(entity => {
                entity.ToTable("EventCategories");
                entity.HasIndex(evtCtg => evtCtg.Id);
                entity.Property(evtCtg => evtCtg.Name)
                      .HasMaxLength(255)
                      .IsRequired();
            });

            modelBuilder.Entity<CategoryEvent>(entity => {
                entity.HasKey(k => new { k.CategoryId, k.EventId });

                entity.HasOne(evt => evt.Event)
                      .WithMany(ctg => ctg.CategoryEvent)
                      .HasForeignKey(evtK => evtK.EventId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(ctg => ctg.Category)
                      .WithMany(evt => evt.CategoryEvent)
                      .HasForeignKey(ctgK => ctgK.CategoryId)
                      .OnDelete(DeleteBehavior.Restrict);
            });

            modelBuilder.Entity<CommercialAccount>(entity => {
                entity.ToTable("CommercialAccounts")
                      .HasIndex(account => account.Email).IsUnique();
                entity.HasMany(evnt => evnt.Events)
                      .WithOne(cmrAcc => cmrAcc.CommercialAccount)
                      .IsRequired()
                      .OnDelete(DeleteBehavior.Restrict);
                entity.HasMany(refToken => refToken.RefreshTokens)
                       .WithOne(cmrAcc => cmrAcc.CommercialAccount);
                entity.Property(account => account.Id)
                       .ValueGeneratedOnAdd();
                entity.Property(account => account.Password)
                      .HasMaxLength(50)
                      .IsRequired();
                entity.Property(account => account.Email)
                      .HasMaxLength(255)
                      .IsRequired();
            });

            modelBuilder.Entity<RefreshToken>(entity => {
                entity.ToTable("RefreshTokens")
                .HasIndex(refToken => refToken.Id);
                entity.HasOne(refToken => refToken.CommercialAccount)
                    .WithMany(evt => evt.RefreshTokens);
                entity.Property(refToken => refToken.Token).IsRequired();
                entity.Property(refToken => refToken.Expires).IsRequired();
                entity.Property(refToken => refToken.Created).IsRequired();
                entity.Property(refToken => refToken.CreatedByIp).IsRequired();
                entity.Property(refToken => refToken.Revoked);
                entity.Property(refToken => refToken.RevokedByIp);
                entity.Property(refToken => refToken.ReplacedByToken);
            });

            modelBuilder.Entity<Placemark>(entity => {
                entity.ToTable("Placemarks")
                .HasIndex(plc => plc.Id);
            });

            modelBuilder.Entity<RegularAccount>(entity => {
                entity.ToTable("RegularAccounts")
                .HasIndex(rglAcc => rglAcc.Email).IsUnique();
                entity.Property(rglAcc => rglAcc.Id)
                       .ValueGeneratedOnAdd();
            });

            modelBuilder.Entity<Image>(entity => {
                entity.ToTable("Images")
                .HasIndex(img => img.Id);
            });

            //FluentAPI
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Event> Events { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<CategoryEvent> CategoryEvents { get; set; }
        public DbSet<CommercialAccount> CommercialAccounts { get; set; }
        public DbSet<RegularAccount> RegularAccounts { get; set; }
        public DbSet<Image> Images { get; set; }
        public DbSet<Placemark> Placemarks { get; set; }

    }
}