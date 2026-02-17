using Microsoft.EntityFrameworkCore;
using ECommerceAPI.Models;

namespace ECommerceAPI.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed initial data
        modelBuilder.Entity<Product>().HasData(
            new Product
            {
                Id = 1,
                Name = "Notebook Gamer",
                Description = "Notebook gamer de alta performance com placa de vídeo dedicada",
                Price = 4500.00m,
                Category = "Eletrônicos",
                Stock = 15,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Id = 2,
                Name = "Smartphone Pro",
                Description = "Smartphone com câmera de 108MP e bateria de longa duração",
                Price = 2500.00m,
                Category = "Eletrônicos",
                Stock = 30,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Id = 3,
                Name = "Mesa de Escritório",
                Description = "Mesa ergonômica de madeira maciça",
                Price = 800.00m,
                Category = "Móveis",
                Stock = 8,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Id = 4,
                Name = "Cadeira Ergonômica",
                Description = "Cadeira de escritório com apoio lombar ajustável",
                Price = 1200.00m,
                Category = "Móveis",
                Stock = 12,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            },
            new Product
            {
                Id = 5,
                Name = "Livro: Introdução à IA",
                Description = "Livro sobre fundamentos de inteligência artificial",
                Price = 89.90m,
                Category = "Livros",
                Stock = 50,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            }
        );
    }
}
