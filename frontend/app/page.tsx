import { Product } from "@/types/product";
import ProductList from "@/components/ProductList";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/products`, {
      cache: "no-store", // SSR - always fetch fresh data
    });

    if (!res.ok) {
      throw new Error("Failed to fetch products");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="container">
      <div className="page-header">
        <h1>Produtos do E-commerce</h1>
        <p>
          Esta página utiliza Server-Side Rendering (SSR) - dados são buscados
          no servidor a cada requisição
        </p>
      </div>

      <ProductList products={products} />
    </div>
  );
}

