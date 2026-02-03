type Props = {
  message: string;
};

function GrandChild({ message }: Props) {
  return <p>GrandChild received: {message}</p>;
}

function Child({ message }: Props) {
  return (
    <div>
      <p>Child passing props down...</p>
      <GrandChild message={message} />
    </div>
  );
}

export function PropsDrillingDemo() {
  const message = "Hello from Parent";
  return (
    <div>
      <p>Parent message: {message}</p>
      <Child message={message} />
    </div>
  );
}
