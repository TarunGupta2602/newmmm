"use client";

import { useState } from "react";
import { StoreProvider, useStore } from "@/context/StoreContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import CompareBar from "@/components/CompareBar";
import NotifyModal from "@/components/NotifyModal";

function Shell({ children }) {
  const { toasts, setPromo, toast } = useStore();
  const [promoOpen, setPromoOpen] = useState(true);
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      {promoOpen && (
        <div className="promo-chip">
          <button
            onClick={() => {
              setPromo("VELA10");
              toast("VELA10 applied — 10% off");
              setPromoOpen(false);
            }}
            style={{ background: "transparent", border: 0, color: "#fff", fontWeight: 700 }}
          >
            % 10% DISCOUNT
          </button>
          <button aria-label="Dismiss offer" onClick={() => setPromoOpen(false)} style={{ background: "transparent", border: 0, color: "#fff" }}>×</button>
        </div>
      )}
      <CartDrawer />
      <CompareBar />
      <NotifyModal />
      <div className="toasts" aria-live="polite">
        {toasts.map((item) => (
          <div className="toast" key={item.id}>{item.message}</div>
        ))}
      </div>
    </>
  );
}

export default function Providers({ children }) {
  return (
    <StoreProvider>
      <Shell>{children}</Shell>
    </StoreProvider>
  );
}
