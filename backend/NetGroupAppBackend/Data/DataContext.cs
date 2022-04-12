using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NetGroupAppBackend.Models;

namespace NetGroupAppBackend.Data
{
    public class DataContext : IdentityDbContext<IdentityUser>
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Storage>? Storages { get; set; }
        public DbSet<Item>? Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder
                .Entity<Storage>()
                .ToTable(nameof(Storage))
                .HasKey(x => x.Id);

            modelBuilder.Entity<Item>(entity =>
            {
                entity.ToTable(nameof(Item));
                entity.HasOne(x => x.Storage)
                    .WithMany(x => x.Items)
                    .HasForeignKey(x => x.StorageId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
        }
    }
}
