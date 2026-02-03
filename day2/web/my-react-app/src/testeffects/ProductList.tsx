import { useState } from "react";
import type { Product } from "../types/product";
import { ProductCard } from "./ProductCard";

const PRODUCTS: Product[] = [
  { id: 1, name: "MacBook", category: "Tech" },
  { id: 2, name: "iPhone", category: "Tech" },
  { id: 3, name: "Chair", category: "Furniture" },
  { id: 4, name: "Table", category: "Furniture" },
  { id: 5, name: "Notebook", category: "Office" },
];

export function ProductList() {
  const [category, setCategory] = useState<string>("All");
  const [search, setSearch] = useState<string>("");

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchCategory = category === "All" || p.category === category;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div style={{ display: "grid", gap: 8 }}>
      {/* Filters */}
      <div style={{ display: "flex", gap: 8 }}>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option>All</option>
          <option>Tech</option>
          <option>Furniture</option>
          <option>Office</option>
        </select>

        <input
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* List */}
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}

      {filteredProducts.length === 0 && <p>No products found</p>}
    </div>
  );
}
