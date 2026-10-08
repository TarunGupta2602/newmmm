"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { searchProducts, money } from "@/data/products";
import { useStore } from "@/context/StoreContext";

const coffeeCards = [
  { href: "/", label: "Automatic Espresso Machines", image: "/images/eletta-explore.jpg" },
  { href: "/browse/manual", label: "Manual Espresso Machines", image: "/images/magnifica-start-manual.jpg" },
  { href: "/browse/drip", label: "Drip Coffee Makers", image: "/images/magnifica-start-silver.jpg" },
  { href: "/browse/nespresso", label: "Capsule Machines", image: "/images/magnifica-evo-latte.jpg" },
  { href: "/browse/all-in-one", label: "All-in-One Coffee Makers", image: "/images/rivelia-sand.jpg" },
  { href: "/choose", label: "Help Me Choose", image: "/images/primadonna-aromatic.jpg" },
];

const coffeeHighlights = [
  { href: "/product/nova-duo", label: "Meet the new Nova Duo", image: "/images/story/milk.jpg" },
  { href: "/?sale=1", label: "Explore best sellers", image: "/images/story/worth.jpg" },
  { href: "/product/atelier-reserve", label: "Discover Atelier Reserve", image: "/images/story/suit.jpg" },
  { href: "/choose", label: "Top rated gifts", image: "/images/story/feat2.jpg" },
];

const accessoryLinks = [
  { href: "/info/parts", label: "Descalers & water filters" },
  { href: "/info/parts", label: "Coffee beans" },
  { href: "/info/parts", label: "Grinders" },
  { href: "/?milk=1", label: "Milk frothers" },
];

const kitchenLinks = [
  { href: "/browse/kitchen", label: "Toaster Ovens & Convection Ovens" },
  { href: "/browse/kitchen", label: "Slow Cookers & Multi-Cookers" },
];

const comfortLinks = [
  { href: "/browse/comfort", label: "Radiator Space Heaters" },
  { href: "/browse/comfort", label: "Convection Heaters" },
  { href: "/browse/comfort", label: "Ceramic & Fan Heaters" },
];

const supportLinks = [
  { href: "/support", label: "Contact us" },
  { href: "/register", label: "Product registration" },
  { href: "/?tab=manuals", label: "Instruction manuals" },
  { href: "/service", label: "Service locator" },
  { href: "/info/warranty", label: "Warranty" },
];

export default function Header() {
  const router = useRouter();
  const store = useStore();
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const count = store.cart.reduce((sum, line) => sum + line.qty, 0);
  const suggestions = useMemo(() => (query.trim() ? searchProducts(query).slice(0, 5) : []), [query]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen || accountOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, accountOpen]);

  const submitSearch = (event) => {
    event.preventDefault();
    setSearchOpen(false);
    router.push(query.trim() ? `/?q=${encodeURIComponent(query.trim())}` : "/");
  };

  const signIn = (event) => {
    event.preventDefault();
    if (!form.name.trim() || !form.email.includes("@") || form.password.length < 4) {
      store.toast("Enter a name, email, and a password of at least 4 characters");
      return;
    }
    store.signIn({ name: form.name.trim(), email: form.email.trim() });
    setAccountOpen(false);
  };

  return (
    <>
      <div className="site-head">
      <div className="topbar">
        <div className="wrap">
          <span>Free shipping on orders over $75</span>
          <span>2-year Vela warranty on every machine</span>
        </div>
      </div>
      <header className="header">
        {menu === "coffee" && <div className="nav-shade" />}
        <div className="wrap header-row">
          <button className="icon-btn mobile-only" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
            <MenuIcon />
          </button>
          <Link href="/" className="logo" aria-label="Vela home">
            Vela
          </Link>
          <nav className="nav" aria-label="Primary">
            <div
              className={`nav-item has-mega ${menu === "coffee" ? "open" : ""}`}
              onMouseEnter={() => setMenu("coffee")}
              onMouseLeave={() => setMenu(null)}
            >
              <button className="nav-btn" aria-expanded={menu === "coffee"}>Coffee & Espresso</button>
              <div className="mega-panel">
                <div className="wrap mega-layout">
                  <div>
                    <div className="mega-cats">
                      {coffeeCards.map((card) => (
                        <Link className="mega-cat" key={card.label} href={card.href} onClick={() => setMenu(null)}>
                          <strong>{card.label}</strong>
                          <img src={card.image} alt="" />
                        </Link>
                      ))}
                    </div>
                    <div className="mega-more">
                      <Link href="/browse/manual" onClick={() => setMenu(null)}>All Espresso Machines</Link>
                      <Link href="/" onClick={() => setMenu(null)}>Coffee Machines</Link>
                    </div>
                  </div>
                  <div>
                    <p className="mega-kicker">Highlights</p>
                    <div className="mega-highlights">
                      {coffeeHighlights.map((card) => (
                        <Link className="mega-hl" key={card.label} href={card.href} onClick={() => setMenu(null)}>
                          <img src={card.image} alt="" />
                          <span>{card.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="nav-item">
              <button className="nav-btn">Accessories & Maintenance</button>
              <div className="menu">
                {accessoryLinks.map((link) => (
                  <Link key={link.label} href={link.href}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div className="nav-item">
              <button className="nav-btn">More appliances</button>
              <div className="menu">
                <Link href="/browse/kitchen">Kitchen</Link>
                {kitchenLinks.map((link) => (
                  <Link key={link.label} href={link.href}>{link.label}</Link>
                ))}
                <Link href="/browse/comfort">Home Comfort</Link>
                {comfortLinks.map((link) => (
                  <Link key={link.label} href={link.href}>{link.label}</Link>
                ))}
              </div>
            </div>
            <div className="nav-item">
              <Link className="nav-btn" href="/?sale=1">Sale</Link>
            </div>
          </nav>
          <div className="actions">
            <Link className="quiet-link" href="/support">Support</Link>
            <Link className="quiet-link" href="/register">Product Registration</Link>
            <div style={{ position: "relative" }}>
              <button className="icon-btn" aria-label="Search" onClick={() => setSearchOpen((open) => !open)}>
                <SearchIcon />
              </button>
              {searchOpen && (
                <form className="search-pop" onSubmit={submitSearch}>
                  <input
                    autoFocus
                    placeholder="Search machines, colors, drinks"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    aria-label="Search catalog"
                  />
                  {suggestions.map((product) => (
                    <Link
                      key={product.slug}
                      href={`/product/${product.slug}`}
                      className="suggest"
                      onClick={() => setSearchOpen(false)}
                    >
                      <img src={product.image} alt="" />
                      <div>
                        <strong>{product.name}</strong>
                        <div><span>{product.range}</span></div>
                      </div>
                      <b>{money(product.price)}</b>
                    </Link>
                  ))}
                  {query.trim() && suggestions.length === 0 && <p className="muted">No matches in this demo catalog.</p>}
                  <button className="solid" type="submit">Search</button>
                </form>
              )}
            </div>
            <button className="icon-btn" aria-label="Account" onClick={() => setAccountOpen(true)}>
              <UserIcon />
            </button>
            <Link href="/saved" className="icon-btn" aria-label="Saved machines">
              <HeartIcon filled={false} />
              {store.wishlist.length > 0 && <span className="badge-count">{store.wishlist.length}</span>}
            </Link>
            <button className="icon-btn" aria-label="Cart" onClick={() => store.setCartOpen(true)}>
              <BagIcon />
              {count > 0 && <span className="badge-count">{count}</span>}
            </button>
          </div>
        </div>
      </header>
      </div>

      {mobileOpen && (
        <div className="mobile-drawer" onClick={() => setMobileOpen(false)}>
          <nav onClick={(event) => event.stopPropagation()}>
            <button onClick={() => setMobileOpen(false)}>Close</button>
            {coffeeCards.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</Link>
            ))}
            <Link href="/browse/kitchen" onClick={() => setMobileOpen(false)}>Kitchen</Link>
            <Link href="/browse/comfort" onClick={() => setMobileOpen(false)}>Home Comfort</Link>
            <Link href="/?sale=1" onClick={() => setMobileOpen(false)}>Sale</Link>
            {supportLinks.map((link) => (
              <Link key={link.label} href={link.href} onClick={() => setMobileOpen(false)}>{link.label}</Link>
            ))}
            <Link href="/cart" onClick={() => setMobileOpen(false)}>Cart</Link>
          </nav>
        </div>
      )}

      {accountOpen && (
        <div className="modal-root" onClick={() => setAccountOpen(false)}>
          <div className="modal account" onClick={(event) => event.stopPropagation()}>
            <header>
              <h2>{store.user ? "Your account" : "Sign in"}</h2>
              <button className="icon-btn" onClick={() => setAccountOpen(false)} aria-label="Close">×</button>
            </header>
            <div className="body">
              {store.user ? (
                <>
                  <p>Signed in as <strong>{store.user.name}</strong></p>
                  <p className="muted">{store.user.email}</p>
                  <p className="muted">This demo keeps the session in your browser only.</p>
                  <button className="solid" onClick={() => { store.signOut(); setAccountOpen(false); }}>Sign out</button>
                </>
              ) : (
                <form className="form" onSubmit={signIn}>
                  <label className="field"><span>Name</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
                  <label className="field"><span>Email</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
                  <label className="field"><span>Password</span><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></label>
                  <button className="solid" type="submit">Sign in</button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MenuIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
}
function SearchIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>;
}
function UserIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="3.2" /><path d="M5 19c1.4-3 3.8-4.5 7-4.5S17.6 16 19 19" /></svg>;
}
function BagIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 8h12l-1 12H7L6 8z" /><path d="M9 8V7a3 3 0 0 1 6 0v1" /></svg>;
}
export function HeartIcon({ filled }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
      <path d="M12 19s-7-4.4-7-9a4 4 0 0 1 7-2 4 4 0 0 1 7 2c0 4.6-7 9-7 9z" />
    </svg>
  );
}
