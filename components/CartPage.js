"use client";

import Link from "next/link";
import { useState } from "react";
import { money, priceCart } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function CartPage() {
  const store = useStore();
  const [code, setCode] = useState(store.promo);
  const priced = priceCart(store.cart, store.promo);

  const apply = (event) => {
    event.preventDefault();
    if (code.trim().toUpperCase() === "VELA10") {
      store.setPromo("VELA10");
      store.toast("VELA10 applied — 10% off");
    } else if (!code.trim()) {
      store.setPromo("");
    } else {
      store.toast("That code is not active. Try VELA10.");
    }
  };

  return (
    <div className="page">
      <div className="wrap">
        <h1>Cart</h1>
        {priced.lines.length === 0 ? (
          <div className="empty">
            <p>Nothing here yet.</p>
            <Link className="solid" href="/" style={{ display: "inline-block" }}>Shop automatic machines</Link>
          </div>
        ) : (
          <div className="checkout">
            <div>
              {priced.lines.map((line) => (
                <div className="line" key={line.slug}>
                  <img src={line.product.image} alt="" />
                  <div>
                    <h3><Link href={`/product/${line.slug}`}>{line.product.name}</Link></h3>
                    <div className="muted">{money(line.product.price)} each</div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
                      <div className="qty">
                        <button onClick={() => store.setQty(line.slug, line.qty - 1)}>−</button>
                        <input readOnly value={line.qty} aria-label="Quantity" />
                        <button onClick={() => store.setQty(line.slug, Math.min(line.product.stock, line.qty + 1))}>+</button>
                      </div>
                      <strong>{money(line.lineTotal)}</strong>
                      <button className="text-btn" onClick={() => store.removeFromCart(line.slug)}>Remove</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <aside className="panel">
              <h2>Summary</h2>
              <form className="promo" onSubmit={apply}>
                <input value={code} onChange={(event) => setCode(event.target.value)} placeholder="Promo code" aria-label="Promo code" />
                <button className="line-btn" type="submit">Apply</button>
              </form>
              <p className="muted">Use VELA10 for 10% off this demo order.</p>
              <div className="sum"><span>Subtotal</span><span>{money(priced.subtotal)}</span></div>
              <div className="sum"><span>Discount</span><span>{priced.discount ? `−${money(priced.discount)}` : "—"}</span></div>
              <div className="sum"><span>Shipping</span><span>{priced.shipping === 0 ? "Free" : money(priced.shipping)}</span></div>
              <div className="sum"><span>Est. tax</span><span>{money(priced.tax)}</span></div>
              <div className="sum"><strong>Total</strong><strong>{money(priced.total)}</strong></div>
              <Link href="/checkout" className="solid" style={{ display: "block", textAlign: "center", marginTop: 12 }}>Checkout</Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
