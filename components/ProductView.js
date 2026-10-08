"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getProduct, money, percentOff, relatedProducts } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import { HeartIcon } from "@/components/Header";
import ProductCard from "@/components/ProductCard";

export default function ProductView({ slug }) {
  const product = getProduct(slug);
  const router = useRouter();
  const store = useStore();
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState("");

  if (!product) {
    return (
      <div className="page wrap">
        <h1>Machine not found</h1>
        <Link className="solid" href="/" style={{ display: "inline-block" }}>Back to machines</Link>
      </div>
    );
  }

  const off = percentOff(product);
  const wished = store.wishlist.includes(product.slug);
  const compared = store.compare.includes(product.slug);
  const related = relatedProducts(product);

  const add = () => {
    if (product.stock < 1) return;
    store.addToCart(product.slug, qty);
  };

  const notify = (event) => {
    event.preventDefault();
    if (!email.includes("@")) {
      store.toast("Enter an email for the restock note");
      return;
    }
    store.toast(`We'll note ${email} when ${product.name} is back. Demo only.`);
    setEmail("");
  };

  return (
    <div className="page">
      <div className="wrap">
        <div className="crumbs">
          <Link href="/">Vela automatic</Link>
          <span>/</span>
          <span>{product.range}</span>
        </div>
        <div className="product">
          <div className="gallery">
            <img src={product.image} alt={product.name} />
          </div>
          <div>
            <div className="pills">
              {off > 0 && <span className="pill">-{off}%</span>}
              {product.badges.map((badge) => <span className="pill" key={badge}>{badge}</span>)}
              <span className="pill">{product.range}</span>
            </div>
            <h1>{product.name}</h1>
            <div className="sku">Model {product.id} · SKU {product.sku}</div>
            <div className="big-price">
              <b>{money(product.price)}</b>
              {product.compareAt && <s>{money(product.compareAt)}</s>}
            </div>
            <p className={product.stock === 0 ? "stock-out" : product.stock <= 10 ? "stock-low" : "stock-ok"}>
              {product.stock === 0 ? "Out of stock" : product.stock <= 10 ? `Only ${product.stock} left` : "In stock — ships in 2 to 4 days"}
            </p>
            <p className="prose">{product.description}</p>
            <div className="pills" style={{ margin: "12px 0" }}>
              {product.features.map((feature) => <span className="pill" key={feature}>{feature}</span>)}
            </div>
            {product.stock > 0 ? (
              <div className="buy-row">
                <div className="qty">
                  <button type="button" onClick={() => setQty((value) => Math.max(1, value - 1))} aria-label="Decrease quantity">−</button>
                  <input aria-label="Quantity" value={qty} onChange={(event) => setQty(Math.max(1, Math.min(product.stock, Number(event.target.value) || 1)))} />
                  <button type="button" onClick={() => setQty((value) => Math.min(product.stock, value + 1))} aria-label="Increase quantity">+</button>
                </div>
                <button className="solid" onClick={add}>Add to cart</button>
                <button className="line-btn" onClick={() => { store.addToCart(product.slug, qty, { open: false }); router.push("/checkout"); }}>Buy now</button>
              </div>
            ) : (
              <form className="promo" onSubmit={notify} style={{ margin: "16px 0" }}>
                <input placeholder="Email for restock" value={email} onChange={(event) => setEmail(event.target.value)} aria-label="Restock email" />
                <button className="solid" type="submit">Notify me</button>
              </form>
            )}
            <div className="side-actions">
              <button className="line-btn" onClick={() => store.toggleWish(product.slug)}>
                <HeartIcon filled={wished} /> {wished ? "Saved" : "Save"}
              </button>
              <button className="line-btn" onClick={() => store.toggleCompare(product.slug)}>
                {compared ? "In compare" : "Compare"}
              </button>
            </div>
            <h2>What you get</h2>
            <ul className="highlights">
              {product.highlights.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <table className="specs">
              <tbody>
                <tr><th>Drinks</th><td>{product.drinks}</td></tr>
                <tr><th>Milk</th><td>{product.milk === "Automatic" ? "Automatic frothing" : "Manual steam wand"}</td></tr>
                <tr><th>Color</th><td>{product.color}</td></tr>
                <tr><th>Cold brew</th><td>{product.coldBrew ? "Yes" : "No"}</td></tr>
                <tr><th>Bean switch</th><td>{product.beanSwitch ? "Two hoppers" : "Single hopper"}</td></tr>
                <tr><th>Warranty</th><td>2-year Vela warranty</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <section className="related">
          <h2>Others you might pour</h2>
          <div className="grid">
            {related.map((item) => <ProductCard key={item.slug} product={item} />)}
          </div>
        </section>
      </div>
    </div>
  );
}
