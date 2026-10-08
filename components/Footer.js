"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/context/StoreContext";

export default function Footer() {
  const { toast } = useStore();
  const [email, setEmail] = useState("");

  const signup = (event) => {
    event.preventDefault();
    if (!email.includes("@")) {
      toast("Enter a valid email");
      return;
    }
    toast("You are on the list. 10% off is the code VELA10. No email was sent.");
    setEmail("");
  };

  return (
    <>
      <section className="news">
        <div className="wrap">
          <div>
            <h2>Early access to Vela launches</h2>
            <p>Sign up and get 10% off.</p>
          </div>
          <form onSubmit={signup}>
            <input aria-label="Email" placeholder="Email address" value={email} onChange={(event) => setEmail(event.target.value)} />
            <button className="solid" type="submit">Sign up</button>
          </form>
        </div>
      </section>
      <footer className="footer">
        <div className="wrap util">
          <Link href="/?tab=faq#guides">
            <FaqIcon />
            <strong>Frequently asked questions</strong>
          </Link>
          <Link href="/service">
            <PinIcon />
            <strong>Service locator</strong>
          </Link>
          <Link href="/support">
            <HeadsetIcon />
            <strong>Need help? Contact us</strong>
          </Link>
          <Link href="/?tab=manuals">
            <BookIcon />
            <strong>Instruction manuals</strong>
          </Link>
        </div>
        <div className="wrap footer-grid">
          <div>
            <h3>Shop</h3>
            <ul>
              <li><Link href="/">Coffee & Espresso</Link></li>
              <li><Link href="/browse/kitchen">Kitchen</Link></li>
              <li><Link href="/browse/comfort">Home Comfort</Link></li>
              <li><Link href="/info/students">Student and other discounts</Link></li>
              <li><Link href="/choose">Help me choose</Link></li>
              <li><Link href="/info/where">Where to buy</Link></li>
            </ul>
          </div>
          <div>
            <h3>My account</h3>
            <ul>
              <li><Link href="/account">Login / Register</Link></li>
              <li><Link href="/register">Product registration</Link></li>
              <li><Link href="/cart">My orders</Link></li>
            </ul>
          </div>
          <div>
            <h3>Product and warranty</h3>
            <ul>
              <li><Link href="/info/shipping">Shipping & returns</Link></li>
              <li><Link href="/info/notice">Notices</Link></li>
              <li><Link href="/info/warranty">Warranty</Link></li>
              <li><Link href="/service">Out of warranty repair</Link></li>
              <li><Link href="/info/recalls">Recalls & corrective actions</Link></li>
              <li><Link href="/info/parts">Spare parts</Link></li>
            </ul>
          </div>
          <div>
            <h3>About Vela</h3>
            <ul>
              <li><Link href="/info/about">About Vela</Link></li>
              <li><Link href="/info/press">Press</Link></li>
              <li><Link href="/info/about">Awards</Link></li>
              <li><Link href="/info/press">Stories and recipes</Link></li>
            </ul>
          </div>
        </div>
        <div className="wrap foot-bottom">
          <div className="pay-row">
            <Link href="/" className="logo" style={{ color: "#fff", borderColor: "#fff" }}>Vela</Link>
            <span>US</span>
            <span>Apple Pay</span>
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
          </div>
          <div className="legal-row">
            <Link href="/info/privacy">Privacy Policy</Link>
            <Link href="/info/notice">Cookie Policy</Link>
            <Link href="/info/shipping">Terms & Conditions</Link>
            <Link href="/support">Accessibility</Link>
          </div>
        </div>
        <div className="wrap legal">
          Vela is a demonstration storefront. Checkout does not take a real payment.
        </div>
      </footer>
    </>
  );
}

function FaqIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9" /><path d="M9.5 9a2.5 2.5 0 1 1 3.2 2.4c-.7.3-1.2.9-1.2 1.6V14" /><path d="M12 17h.01" /></svg>;
}
function PinIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.2" /></svg>;
}
function HeadsetIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M4 13a8 8 0 0 1 16 0" /><path d="M4 13v4a2 2 0 0 0 2 2h1v-6H6a2 2 0 0 0-2 2zM20 13v4a2 2 0 0 1-2 2h-1v-6h1a2 2 0 0 1 2 2z" /></svg>;
}
function BookIcon() {
  return <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H20v16H7.5A2.5 2.5 0 0 0 5 21.5z" /><path d="M5 5.5A2.5 2.5 0 0 1 7.5 3" /></svg>;
}
