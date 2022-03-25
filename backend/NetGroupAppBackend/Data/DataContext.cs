using Microsoft.EntityFrameworkCore;
using NetGroupAppBackend.Models;

namespace NetGroupAppBackend.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<Storage> Storages { get; set; }
        public DbSet<Item> Items { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Storage>().ToTable("Storages");
            modelBuilder.Entity<Item>().ToTable("Items");
        }

    }
}
