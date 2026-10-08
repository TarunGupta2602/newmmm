"use client";

import Link from "next/link";
import { money, percentOff } from "@/data/products";
import { useStore } from "@/context/StoreContext";

const ratings = {
  "atelier-reserve": [4.8, 864],
  "vista-explore": [4.8, 1204],
  "cambria-sand": [4.7, 2258],
  "cambria-onyx": [4.7, 2258],
  "cambria-arctic": [4.7, 1980],
  "cambria-pebble": [4.6, 980],
  "nova-start-silver": [4.6, 721],
  "nova-duo": [4.9, 319],
  "nova-start-black": [4.5, 410],
  "nova-start-steam": [4.4, 266],
  "nova-evo-foam": [4.7, 1540],
  "nova-evo-steam": [4.5, 802],
  "nova-plus": [4.8, 640],
  "nova-next": [4.6, 390],
};

export default function ProductCard({ product }) {
  const { addToCart, toggleCompare, compare } = useStore();
  const off = percentOff(product);
  const checked = compare.includes(product.slug);
  const [score, count] = ratings[product.slug] || [4.6, 120];
  const full = score >= 4.75 ? 5 : 4;
  const stars = `${"★".repeat(full)}${"☆".repeat(5 - full)}`;

  return (
    <article className="card">
      <div className="media">
        <div className="flags">
          {off > 0 && <span className="flag">-{off}%</span>}
          {product.badges.map((badge) => (
            <span className="flag" key={badge}>{badge.toUpperCase()}</span>
          ))}
        </div>
        <label className="compare">
          <input type="checkbox" checked={checked} onChange={() => toggleCompare(product.slug)} />
          COMPARE
        </label>
        <Link href={`/product/${product.slug}`}>
          <img src={product.image} alt={product.name} />
        </Link>
      </div>
      <div className="stars" aria-label={`${score} out of 5, ${count} reviews`}>
        <b>{stars}</b>
        <span>{score.toFixed(1)} ({count})</span>
      </div>
      <h2><Link href={`/product/${product.slug}`}>{product.name}</Link></h2>
      <div className="feat-row">
        {product.features.map((feature) => (
          <span key={feature}><Dot /> {feature}</span>
        ))}
      </div>
      <div className="price-row">
        <div className="price">
          <b>{money(product.price)}</b>
          {product.compareAt && <s>{money(product.compareAt)}</s>}
          {off > 0 && <span className="off">(-{off}%)</span>}
        </div>
        <button className="bag-btn" aria-label={product.stock > 0 ? "Add to cart" : "Notify me"} onClick={() => addToCart(product.slug)}>
          <BagIcon />
        </button>
      </div>
    </article>
  );
}

function Dot() {
  return <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="8" cy="8" r="5.5" /></svg>;
}
function BagIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8V7a3 3 0 0 1 6 0v1" /></svg>;
}
