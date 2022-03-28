using Microsoft.EntityFrameworkCore;
using NetGroupAppBackend.Models;

namespace NetGroupAppBackend.Data
{
    public class DataContext : DbContext
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.

        public DbSet<Storage> Storages { get; set; }
        public DbSet<Item> Items { get; set; }

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
                    .HasForeignKey(x => x.StorageId);
            });
        }
    }
}
