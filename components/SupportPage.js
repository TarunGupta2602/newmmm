"use client";

import { useState } from "react";
import { useStore } from "@/context/StoreContext";

export default function SupportPage() {
  const { toast } = useStore();
  const [form, setForm] = useState({ name: "", email: "", topic: "Machine choice", message: "" });
  const [sent, setSent] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || form.message.trim().length < 8) {
      toast("Add your name, email, and a short message");
      return;
    }
    setSent(true);
  };

  return (
    <div className="page">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <h1>Support</h1>
        <p className="lede">Ask which Vela fits the counter, how SilkFoam works, or how twin bins switch roasts. This form does not email anyone.</p>
        {sent ? (
          <div className="panel">
            <h2>Message received</h2>
            <p>Thanks {form.name}. In a live store this would open a support ticket about “{form.topic}”.</p>
          </div>
        ) : (
          <form className="form panel" onSubmit={submit}>
            <label className="field"><span>Name</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            <label className="field"><span>Email</span><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
            <label className="field">
              <span>Topic</span>
              <select value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
                <option>Machine choice</option>
                <option>Order</option>
                <option>Cleaning</option>
                <option>Warranty</option>
              </select>
            </label>
            <label className="field"><span>Message</span><textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
            <button className="solid" type="submit">Send</button>
          </form>
        )}
      </div>
    </div>
  );
}
