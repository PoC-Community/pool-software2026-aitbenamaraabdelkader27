import { useState } from "react";
import { Button } from "../components/Button";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !message) {
      setInfo("All fields are required");
      return;
    }

    if (!email.includes("@")) {
      setInfo("Invalid email");
      return;
    }

    setInfo("Message sent!");
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 8 }}>
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Message" />

      {info && <p>{info}</p>}

      <button type="submit">Send</button>
    </form>
  );
}
