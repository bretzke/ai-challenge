using ECommerceAPI.DTOs;
using ECommerceAPI.Models;

namespace ECommerceAPI.Services;

public interface IProductService
{
    Task<List<Product>> GetAllProductsAsync();
    Task<Product?> GetProductByIdAsync(int id);
    Task<Product> CreateProductAsync(CreateProductDto dto);
    Task<Product?> UpdateProductAsync(int id, UpdateProductDto dto);
    Task<bool> DeleteProductAsync(int id);
}
