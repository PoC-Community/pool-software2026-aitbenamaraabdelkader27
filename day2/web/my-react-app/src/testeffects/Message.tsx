import { useEffect } from "react";

export function Message() {
  useEffect(() => {
    console.log("Component mounted");
  }, []);

  return <p>Check the console on mount</p>;
}
