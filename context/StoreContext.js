"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProduct } from "@/data/products";

const StoreContext = createContext(null);
const STORAGE_KEY = "vela-demo-store";

const empty = {
  cart: [],
  wishlist: [],
  compare: [],
  user: null,
  promo: "",
};

export function StoreProvider({ children }) {
  const [store, setStore] = useState(empty);
  const [ready, setReady] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [notifySlug, setNotifySlug] = useState(null);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setStore({ ...empty, ...parsed, compare: parsed.compare || [] });
      }
    } catch {
      /* ignore broken local storage */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        cart: store.cart,
        wishlist: store.wishlist,
        compare: store.compare,
        user: store.user,
        promo: store.promo,
      })
    );
  }, [store, ready]);

  const api = useMemo(() => {
    const toast = (message) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((current) => [...current, { id, message }]);
      setTimeout(() => {
        setToasts((current) => current.filter((item) => item.id !== id));
      }, 2800);
    };

    const addToCart = (slug, qty = 1, options = {}) => {
      const product = getProduct(slug);
      if (!product || product.stock < 1) {
        setNotifySlug(slug);
        return;
      }
      setStore((current) => {
        const existing = current.cart.find((line) => line.slug === slug);
        const nextQty = Math.min(product.stock, (existing?.qty || 0) + qty);
        const cart = existing
          ? current.cart.map((line) => (line.slug === slug ? { ...line, qty: nextQty } : line))
          : [...current.cart, { slug, qty: nextQty }];
        return { ...current, cart };
      });
      if (options.open !== false) setCartOpen(true);
    };

    return {
      ...store,
      ready,
      cartOpen,
      setCartOpen,
      notifySlug,
      setNotifySlug,
      toasts,
      toast,
      addToCart,
      setQty: (slug, qty) => {
        setStore((current) => ({
          ...current,
          cart:
            qty < 1
              ? current.cart.filter((line) => line.slug !== slug)
              : current.cart.map((line) => (line.slug === slug ? { ...line, qty } : line)),
        }));
      },
      removeFromCart: (slug) => {
        setStore((current) => ({
          ...current,
          cart: current.cart.filter((line) => line.slug !== slug),
        }));
      },
      clearCart: () => setStore((current) => ({ ...current, cart: [], promo: "" })),
      toggleWish: (slug) => {
        const has = store.wishlist.includes(slug);
        toast(has ? "Removed from saved" : "Saved for later");
        setStore((current) => ({
          ...current,
          wishlist: has
            ? current.wishlist.filter((item) => item !== slug)
            : [...current.wishlist, slug],
        }));
      },
      toggleCompare: (slug) => {
        if (store.compare.includes(slug)) {
          setStore((current) => ({
            ...current,
            compare: current.compare.filter((item) => item !== slug),
          }));
          return;
        }
        if (store.compare.length >= 3) {
          toast("Compare up to 3 machines");
          return;
        }
        setStore((current) => ({ ...current, compare: [...current.compare, slug] }));
      },
      clearCompare: () => setStore((current) => ({ ...current, compare: [] })),
      setPromo: (promo) => setStore((current) => ({ ...current, promo })),
      signIn: (user) => {
        setStore((current) => ({ ...current, user }));
        toast(`Welcome, ${user.name}`);
      },
      signOut: () => {
        setStore((current) => ({ ...current, user: null }));
        toast("Signed out");
      },
    };
  }, [store, ready, cartOpen, notifySlug, toasts]);

  return <StoreContext.Provider value={api}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const value = useContext(StoreContext);
  if (!value) throw new Error("useStore must be used inside StoreProvider");
  return value;
}
