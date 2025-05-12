using Microsoft.EntityFrameworkCore;
using BokAPI.Models;

namespace BokAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options) { }

        public DbSet<Book> Books { get; set; }
    }
}
