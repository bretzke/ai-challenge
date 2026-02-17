using Microsoft.EntityFrameworkCore;
using Npgsql.EntityFrameworkCore.PostgreSQL;
using ECommerceAPI.Data;
using ECommerceAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env file (any environment)
var root = Directory.GetCurrentDirectory();
var dotenv = Path.Combine(root, ".env");
if (File.Exists(dotenv))
{
    foreach (var line in File.ReadAllLines(dotenv))
    {
        var parts = line.Split('=', 2, StringSplitOptions.RemoveEmptyEntries);
        if (parts.Length == 2)
        {
            Environment.SetEnvironmentVariable(parts[0].Trim(), parts[1].Trim());
        }
    }
}

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database (PostgreSQL - connection string from .env only)
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION")
    ?? throw new InvalidOperationException(
        "Database connection not configured. Set DB_CONNECTION in the backend .env file (e.g. DB_CONNECTION=Host=localhost;Port=5432;Database=ecommerce;Username=postgres;Password=postgres)");
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseNpgsql(connectionString));

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Services
builder.Services.AddHttpClient<IGeminiService, GeminiService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IAIService, AIService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

// Initialize database
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    db.Database.EnsureCreated();
}

app.Run();
