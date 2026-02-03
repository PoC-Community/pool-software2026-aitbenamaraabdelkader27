import type { Product } from "../types/product";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  return (
    <div style={{ border: "1px solid #ddd", padding: 8, borderRadius: 6 }}>
      <strong>{product.name}</strong>
      <p style={{ margin: 0, color: "#666" }}>{product.category}</p>
    </div>
  );
}
