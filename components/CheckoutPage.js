"use client";

import Link from "next/link";
import { useState } from "react";
import { money, priceCart } from "@/data/products";
import { useStore } from "@/context/StoreContext";

const blank = {
  name: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  card: "",
  exp: "",
  cvc: "",
};

export default function CheckoutPage() {
  const store = useStore();
  const priced = priceCart(store.cart, store.promo);
  const [form, setForm] = useState({ ...blank, name: store.user?.name || "", email: store.user?.email || "" });
  const [order, setOrder] = useState(null);

  const set = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const place = (event) => {
    event.preventDefault();
    if (priced.lines.length === 0) {
      store.toast("Add a machine before checkout");
      return;
    }
    const required = ["name", "email", "address", "city", "state", "zip", "card", "exp", "cvc"];
    if (required.some((key) => !form[key].trim()) || !form.email.includes("@")) {
      store.toast("Fill every field with a valid email");
      return;
    }
    if (form.card.replace(/\s/g, "").length < 12 || form.cvc.length < 3) {
      store.toast("Use any 12+ digit demo card number");
      return;
    }
    const id = `VL${Date.now().toString().slice(-8)}`;
    setOrder({ id, total: priced.total, email: form.email, name: form.name });
    store.clearCart();
  };

  if (order) {
    return (
      <div className="page">
        <div className="wrap success">
          <p className="muted">Order {order.id}</p>
          <h1>Thanks, {order.name.split(" ")[0]}.</h1>
          <p>A confirmation would go to {order.email}. Nothing was charged. Preview total {money(order.total)}.</p>
          <Link className="solid" href="/" style={{ display: "inline-block" }}>Keep browsing</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="wrap">
        <h1>Checkout</h1>
        <p className="muted">Practice checkout. Card details stay in this browser and are not sent anywhere.</p>
        {priced.lines.length === 0 ? (
          <div className="empty">
            <p>Your cart is empty.</p>
            <Link className="solid" href="/">Shop machines</Link>
          </div>
        ) : (
          <form className="checkout" onSubmit={place}>
            <div className="panel form">
              <h2>Delivery</h2>
              <div className="form-grid">
                <label className="field full"><span>Full name</span><input value={form.name} onChange={set("name")} /></label>
                <label className="field full"><span>Email</span><input value={form.email} onChange={set("email")} /></label>
                <label className="field full"><span>Address</span><input value={form.address} onChange={set("address")} /></label>
                <label className="field"><span>City</span><input value={form.city} onChange={set("city")} /></label>
                <label className="field"><span>State</span><input value={form.state} onChange={set("state")} /></label>
                <label className="field"><span>ZIP</span><input value={form.zip} onChange={set("zip")} /></label>
              </div>
              <h2>Payment</h2>
              <div className="form-grid">
                <label className="field full"><span>Card number</span><input inputMode="numeric" placeholder="4242 4242 4242 4242" value={form.card} onChange={set("card")} /></label>
                <label className="field"><span>Expiry</span><input placeholder="12/28" value={form.exp} onChange={set("exp")} /></label>
                <label className="field"><span>CVC</span><input placeholder="123" value={form.cvc} onChange={set("cvc")} /></label>
              </div>
              <button className="solid" type="submit">Place demo order · {money(priced.total)}</button>
            </div>
            <aside className="panel">
              <h2>Your machines</h2>
              {priced.lines.map((line) => (
                <div className="sum" key={line.slug} style={{ marginBottom: 10 }}>
                  <span>{line.qty} × {line.product.name}</span>
                  <span>{money(line.lineTotal)}</span>
                </div>
              ))}
              <div className="sum"><span>Discount</span><span>{priced.discount ? `−${money(priced.discount)}` : "—"}</span></div>
              <div className="sum"><span>Shipping</span><span>{priced.shipping === 0 ? "Free" : money(priced.shipping)}</span></div>
              <div className="sum"><span>Tax</span><span>{money(priced.tax)}</span></div>
              <div className="sum"><strong>Total</strong><strong>{money(priced.total)}</strong></div>
            </aside>
          </form>
        )}
      </div>
    </div>
  );
}
