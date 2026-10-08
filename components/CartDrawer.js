"use client";

import Link from "next/link";
import { money, priceCart } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function CartDrawer() {
  const store = useStore();
  if (!store.cartOpen) return null;
  const priced = priceCart(store.cart, store.promo);

  return (
    <div className="drawer-root" onClick={() => store.setCartOpen(false)}>
      <aside className="drawer" onClick={(event) => event.stopPropagation()}>
        <header>
          <h2>Cart</h2>
          <button className="icon-btn" aria-label="Close cart" onClick={() => store.setCartOpen(false)}>×</button>
        </header>
        <div className="body">
          {priced.lines.length === 0 && (
            <div className="empty">
              <p>Your cart is empty.</p>
              <Link className="solid" href="/" onClick={() => store.setCartOpen(false)} style={{ display: "inline-block" }}>Browse machines</Link>
            </div>
          )}
          {priced.lines.map((line) => (
            <div className="line" key={line.slug}>
              <img src={line.product.image} alt="" />
              <div>
                <h3><Link href={`/product/${line.slug}`} onClick={() => store.setCartOpen(false)}>{line.product.name}</Link></h3>
                <div className="muted">{money(line.product.price)}</div>
                <div className="qty" style={{ marginTop: 8 }}>
                  <button onClick={() => store.setQty(line.slug, line.qty - 1)} aria-label="Decrease">−</button>
                  <input readOnly value={line.qty} aria-label="Quantity" />
                  <button onClick={() => store.setQty(line.slug, Math.min(line.product.stock, line.qty + 1))} aria-label="Increase">+</button>
                </div>
                <button className="text-btn" onClick={() => store.removeFromCart(line.slug)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
        {priced.lines.length > 0 && (
          <div className="totals">
            <div className="sum"><span>Subtotal</span><span>{money(priced.subtotal)}</span></div>
            <div className="sum"><span>Shipping</span><span>{priced.shipping === 0 ? "Free" : money(priced.shipping)}</span></div>
            <Link href="/cart" className="line-btn" style={{ textAlign: "center" }} onClick={() => store.setCartOpen(false)}>View cart</Link>
            <Link href="/checkout" className="solid" style={{ textAlign: "center" }} onClick={() => store.setCartOpen(false)}>Checkout</Link>
          </div>
        )}
      </aside>
    </div>
  );
}
