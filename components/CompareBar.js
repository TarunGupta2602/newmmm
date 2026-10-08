"use client";

import { useState } from "react";
import Link from "next/link";
import { getProduct, money } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function CompareBar() {
  const { compare, clearCompare, toggleCompare } = useStore();
  const [open, setOpen] = useState(false);
  if (!compare.length) return null;
  const items = compare.map(getProduct).filter(Boolean);

  return (
    <>
      <div className="compare-bar">
        <div className="compare-picks">
          {items.map((product) => (
            <img key={product.slug} src={product.image} alt={product.name} title={product.name} />
          ))}
          <span>{items.length} selected</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="ghost" onClick={clearCompare}>Clear</button>
          <button className="solid" onClick={() => setOpen(true)} disabled={items.length < 2}>Compare</button>
        </div>
      </div>
      {open && (
        <div className="modal-root" onClick={() => setOpen(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <header>
              <h2>Compare</h2>
              <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close compare">×</button>
            </header>
            <div className="body">
              <table className="compare-table">
                <thead>
                  <tr>
                    <th />
                    {items.map((product) => (
                      <th key={product.slug}>
                        <img src={product.image} alt="" />
                        <Link href={`/product/${product.slug}`} onClick={() => setOpen(false)}>{product.name}</Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <Row label="Price" values={items.map((product) => money(product.price))} />
                  <Row label="Drinks" values={items.map((product) => String(product.drinks))} />
                  <Row label="Milk" values={items.map((product) => product.milk)} />
                  <Row label="Color" values={items.map((product) => product.color)} />
                  <Row label="Cold brew" values={items.map((product) => (product.coldBrew ? "Yes" : "No"))} />
                  <Row label="Bean switch" values={items.map((product) => (product.beanSwitch ? "Yes" : "No"))} />
                </tbody>
              </table>
              <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
                {items.map((product) => (
                  <button key={product.slug} className="line-btn" onClick={() => toggleCompare(product.slug)}>Remove {product.range}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, values }) {
  return (
    <tr>
      <th>{label}</th>
      {values.map((value, index) => <td key={`${label}-${index}`}>{value}</td>)}
    </tr>
  );
}
