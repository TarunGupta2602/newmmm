"use client";

import Link from "next/link";
import { getProduct } from "@/data/products";
import { useStore } from "@/context/StoreContext";
import ProductCard from "@/components/ProductCard";

export default function SavedPage() {
  const { wishlist } = useStore();
  const items = wishlist.map(getProduct).filter(Boolean);

  return (
    <div className="page">
      <div className="wrap">
        <h1>Saved machines</h1>
        {items.length === 0 ? (
          <div className="empty">
            <p>Save a machine from its page and it will land here.</p>
            <Link className="solid" href="/">Browse</Link>
          </div>
        ) : (
          <div className="grid">
            {items.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        )}
      </div>
    </div>
  );
}
