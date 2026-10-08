"use client";

import Link from "next/link";
import { getProduct } from "@/data/products";

export default function ManualPage({ slug }) {
  const product = getProduct(slug);
  if (!product) {
    return (
      <div className="page wrap">
        <h1>Manual not found</h1>
        <Link href="/?tab=manuals">All manuals</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <div className="crumbs">
          <Link href="/?tab=manuals">Instruction manuals</Link>
          <span>/</span>
          <span>{product.id}</span>
        </div>
        <h1>{product.name}</h1>
        <p className="muted">Model {product.id} · Care guide for this demo. Not a manufacturer booklet.</p>
        <img src={product.image} alt="" style={{ width: 280, margin: "12px 0" }} />
        <h2>Every day</h2>
        <ol className="highlights">
          <li>Empty the drip tray and puck drawer when the lights ask.</li>
          <li>After a milk drink, run the carafe rinse or wipe the steam wand.</li>
          <li>Refill the water tank with fresh water. Do not use sparkling water.</li>
        </ol>
        <h2>Each week</h2>
        <ol className="highlights">
          <li>Lift out the brew group and rinse it under lukewarm water. Let it dry before it goes back.</li>
          <li>Wipe the bean bin and the outside with a damp cloth.</li>
        </ol>
        <h2>When the screen says descale</h2>
        <ol className="highlights">
          <li>Empty the tank and mix the descale solution as the bottle says.</li>
          <li>Start the descale program and keep a large jug under the spouts.</li>
          <li>Run two rinse tanks of fresh water before the next coffee.</li>
        </ol>
        <p>Milk on this model: {product.milk === "Automatic" ? "SilkFoam carafe." : "Steam wand."} Drink count: {product.drinks}.</p>
        <Link href={`/product/${product.slug}`}>Back to the machine</Link>
      </div>
    </div>
  );
}
