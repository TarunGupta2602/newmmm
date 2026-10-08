"use client";

import { useState } from "react";
import Link from "next/link";
import { useStore } from "@/context/StoreContext";

export default function AccountPage() {
  const store = useStore();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const signIn = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || form.password.length < 4) {
      store.toast("Enter a name, email, and a password of at least 4 characters");
      return;
    }
    store.signIn({ name: form.name.trim(), email: form.email.trim() });
  };

  return (
    <div className="page">
      <div className="wrap" style={{ maxWidth: 640 }}>
        <h1>Account</h1>
        {store.user ? (
          <div className="panel">
            <p>Signed in as <strong>{store.user.name}</strong></p>
            <p className="muted">{store.user.email}</p>
            <p>Orders in this demo live in the cart until you check out.</p>
            <div style={{ display: "flex", gap: 8 }}>
              <Link className="solid" href="/cart">View cart</Link>
              <button className="line-btn" onClick={store.signOut}>Sign out</button>
            </div>
          </div>
        ) : (
          <form className="form panel" onSubmit={signIn}>
            <label className="field"><span>Name</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
            <label className="field"><span>Email</span><input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
            <label className="field"><span>Password</span><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
            <button className="solid" type="submit">Sign in</button>
          </form>
        )}
      </div>
    </div>
  );
}
