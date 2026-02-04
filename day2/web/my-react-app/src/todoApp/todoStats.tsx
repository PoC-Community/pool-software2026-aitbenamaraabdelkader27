type Props = {
  remaining: number;
  total: number;
};

export function TodoStats({ remaining, total }: Props) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", color: "#666" }}>
      <span>{remaining} tasks remaining</span>
      <span>{total} total</span>
    </div>
  );
}
