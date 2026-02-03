import type { ReactNode } from "react";

function Card({ children }: { children: ReactNode }) {
  return (
    <div style={{ border: "1px solid #ddd", borderRadius: 10, padding: 12 }}>
      {children}
    </div>
  );
}

function CardHeader({ children }: { children: ReactNode }) {
  return <div style={{ marginBottom: 8, fontWeight: "bold" }}>{children}</div>;
}

function CardBody({ children }: { children: ReactNode }) {
  return <div style={{ marginBottom: 8 }}>{children}</div>;
}

function CardFooter({ children }: { children: ReactNode }) {
  return <div style={{ color: "#666", fontSize: 14 }}>{children}</div>;
}

export function ComposedCardDemo() {
  return (
    <Card>
      <CardHeader>Card Header</CardHeader>
      <CardBody>card with composition and children.</CardBody>
      <CardFooter> text</CardFooter>
    </Card>
  );
}
