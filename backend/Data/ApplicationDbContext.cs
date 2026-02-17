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

        var product = modelBuilder.Entity<Product>();

        // Table name lowercase so raw SQL (e.g. from AI) works: PostgreSQL lowercases unquoted identifiers
        product.ToTable("products");

        // Column names lowercase so raw SQL from AI works (PostgreSQL lowercases unquoted identifiers)
        product.Property(p => p.Id)
            .HasColumnName("id")
            .UseIdentityByDefaultColumn();

        product.Property(p => p.Name)
            .HasColumnName("name")
            .HasMaxLength(500)
            .IsRequired();

        product.Property(p => p.Description)
            .HasColumnName("description")
            .IsRequired();

        product.Property(p => p.Price)
            .HasColumnName("price")
            .HasPrecision(18, 2);

        product.Property(p => p.Category)
            .HasColumnName("category")
            .HasMaxLength(200)
            .IsRequired();

        product.Property(p => p.Stock)
            .HasColumnName("stock")
            .IsRequired();

        product.Property(p => p.CreatedAt)
            .HasColumnName("created_at")
            .HasColumnType("timestamptz");

        product.Property(p => p.UpdatedAt)
            .HasColumnName("updated_at")
            .HasColumnType("timestamptz");

        // Seed initial data (fixed dates for reproducibility)
        // date now
        var seedDate = DateTime.UtcNow;
        product.HasData(
            new Product
            {
                Id = 1,
                Name = "Notebook Gamer",
                Description = "Notebook gamer de alta performance com placa de vídeo dedicada",
                Price = 4500.00m,
                Category = "Eletrônicos",
                Stock = 15,
                CreatedAt = seedDate,
                UpdatedAt = seedDate
            },
            new Product
            {
                Id = 2,
                Name = "Smartphone Pro",
                Description = "Smartphone com câmera de 108MP e bateria de longa duração",
                Price = 2500.00m,
                Category = "Eletrônicos",
                Stock = 30,
                CreatedAt = seedDate,
                UpdatedAt = seedDate
            },
            new Product
            {
                Id = 3,
                Name = "Mesa de Escritório",
                Description = "Mesa ergonômica de madeira maciça",
                Price = 800.00m,
                Category = "Móveis",
                Stock = 8,
                CreatedAt = seedDate,
                UpdatedAt = seedDate
            },
            new Product
            {
                Id = 4,
                Name = "Cadeira Ergonômica",
                Description = "Cadeira de escritório com apoio lombar ajustável",
                Price = 1200.00m,
                Category = "Móveis",
                Stock = 12,
                CreatedAt = seedDate,
                UpdatedAt = seedDate
            },
            new Product
            {
                Id = 5,
                Name = "Livro: Introdução à IA",
                Description = "Livro sobre fundamentos de inteligência artificial",
                Price = 89.90m,
                Category = "Livros",
                Stock = 50,
                CreatedAt = seedDate,
                UpdatedAt = seedDate
            }
        );
    }
}
