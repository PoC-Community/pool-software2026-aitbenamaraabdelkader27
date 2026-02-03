import type { ReactNode } from "react";

type CardProps = {
  title: string;
  description: string;
  children?: ReactNode;
};

export function Card({ title, description, children }: CardProps) {
  return (
    <section style={{ border: "1px solid #ccc", padding: "16px", borderRadius: "8px", marginBottom: "16px" }}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>
      <p style={{ color: "#444" }}>{description}</p>
      {children}
    </section>
  );
}
