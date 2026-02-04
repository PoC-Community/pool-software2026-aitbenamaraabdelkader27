type Props = {
  remaining: number;
  total: number;
};
export function TodoStats({ remaining, total }: Props) {
  return (
    <div style={{ marginTop: 20 }}>
      <strong>{remaining}</strong> task
      {remaining !== 1 ? "s" : ""} remaining out of <strong>{total}</strong>
    </div>
  );
}