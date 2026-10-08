"use client";

import { useState } from "react";
import { getProduct } from "@/data/products";
import { useStore } from "@/context/StoreContext";

export default function NotifyModal() {
  const { notifySlug, setNotifySlug, toast } = useStore();
  const [email, setEmail] = useState("");
  const product = notifySlug ? getProduct(notifySlug) : null;
  if (!product) return null;

  const submit = (event) => {
    event.preventDefault();
    if (!email.includes("@")) {
      toast("Enter an email");
      return;
    }
    toast(`Restock note saved for ${product.name}. Demo only.`);
    setEmail("");
    setNotifySlug(null);
  };

  return (
    <div className="modal-root" onClick={() => setNotifySlug(null)}>
      <div className="modal account" onClick={(event) => event.stopPropagation()}>
        <header>
          <h2>Notify me</h2>
          <button className="icon-btn" onClick={() => setNotifySlug(null)} aria-label="Close">×</button>
        </header>
        <div className="body">
          <p>{product.name} is out of stock.</p>
          <form className="form" onSubmit={submit}>
            <input placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} aria-label="Email" />
            <button className="solid" type="submit">Email me</button>
          </form>
        </div>
      </div>
    </div>
  );
}
