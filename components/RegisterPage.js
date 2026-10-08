"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function RegisterPage() {
  const { toast } = useStore();
  const [form, setForm] = useState({ model: products[0].id, serial: "", email: "", name: "" });
  const [done, setDone] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || form.serial.trim().length < 4) {
      toast("Add your name, email, and a serial of at least 4 characters");
      return;
    }
    setDone(true);
  };

  return (
    <div className="page">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <h1>Product registration</h1>
        <p className="lede">Register a Vela machine to start the 2-year warranty clock. This form stays in the browser.</p>
        {done ? (
          <div className="panel">
            <h2>Registered</h2>
            <p>{form.name}, model {form.model} is on file for {form.email}. No record was sent to a server.</p>
          </div>
        ) : (
          <form className="form panel" onSubmit={submit}>
            <label className="field"><span>Name</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            <label className="field"><span>Email</span><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
            <label className="field">
              <span>Model</span>
              <select value={form.model} onChange={(e) => setForm({ ...form, model: e.target.value })}>
                {products.map((product) => <option key={product.id} value={product.id}>{product.id} — {product.name}</option>)}
              </select>
            </label>
            <label className="field"><span>Serial number</span><input value={form.serial} onChange={(e) => setForm({ ...form, serial: e.target.value })} /></label>
            <button className="solid" type="submit">Register</button>
          </form>
        )}
      </div>
    </div>
  );
}
