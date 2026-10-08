"use client";

import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";

const browse = {
  manual: {
    title: "Manual Espresso",
    body: "Portafilter machines are a different aisle. This Vela catalog is the automatic range — grind, brew, and milk from one machine.",
  },
  drip: {
    title: "Drip Brewers",
    body: "Batch brewers are not stocked here yet. The machines below are the automatic espresso models you can add to a cart today.",
  },
  nespresso: {
    title: "Capsule Machines",
    body: "Pod machines are a separate family. This shop is whole-bean automatic espresso, with a working cart, search, and checkout.",
  },
  "all-in-one": {
    title: "All-in-One Brewers",
    body: "Combination brewers are outside this catalog. The automatic espresso listing is the shoppable aisle.",
  },
  kitchen: {
    title: "Kitchen",
    body: "Ovens and multi-cookers are not loaded in this shop. The coffee catalog is the live aisle.",
  },
  comfort: {
    title: "Home Comfort",
    body: "Heaters are not part of Vela. Jump back to automatic espresso.",
  },
};

const info = {
  shipping: {
    title: "Shipping",
    body: "Orders over $75 ship free. Every machine in this catalog clears that line, so checkout shows free shipping. Delivery windows are illustrative.",
  },
  returns: {
    title: "Returns",
    body: "A live Vela shop would take unused machines back within 30 days. This demo does not create a shipment or a return label.",
  },
  warranty: {
    title: "Warranty",
    body: "Every Vela automatic includes a 2-year warranty from the ship date. Registering a machine in this demo does not contact a service desk.",
  },
  privacy: {
    title: "Privacy",
    body: "Cart, saved machines, and sign-in stay in local storage on this browser. Checkout card numbers are not sent to a server.",
  },
  students: {
    title: "Student and other discounts",
    body: "A live shop would verify a student or partner email before taking money off. In this demo, use code VELA10 at checkout for 10% off any machine.",
  },
  where: {
    title: "Where to buy",
    body: "This demonstration sells only here, on the Vela automatic espresso shop. There is no separate retailer list. Use the service locator if you need a care desk.",
  },
  notice: {
    title: "Notices",
    body: "This is a front-end demo. It does not collect payments, ship goods, or file product registrations with a manufacturer.",
  },
  recalls: {
    title: "Recalls and corrective actions",
    body: "No recalls are posted for this demo catalog. A live shop would list affected model numbers and the fix here.",
  },
  parts: {
    title: "Spare parts",
    body: "Carafes, water filters, and descale packs would be listed here. This demo catalog is the machines only. Ask support if you want a part called out on a future page.",
  },
  about: {
    title: "About Vela",
    body: "Vela is a fictional coffee-machine shop built for a client walkthrough. The automatic range covers everyday Nova machines, twin-bin Cambria, wide-menu Vista, and flagship Atelier.",
  },
  press: {
    title: "Press and stories",
    body: "Product news in this demo: Nova Duo pours hot and cold foam, and Cambria keeps two roasts ready. There is no press office behind this page.",
  },
};

export function BrowsePage({ slug }) {
  const page = browse[slug];
  if (!page) {
    return (
      <div className="page wrap">
        <h1>Page not found</h1>
        <Link href="/">Back to machines</Link>
      </div>
    );
  }
  return (
    <div className="page">
      <div className="wrap">
        <h1>{page.title}</h1>
        <p className="lede">{page.body}</p>
        <Link className="solid" href="/" style={{ display: "inline-block", marginBottom: 28 }}>Shop automatic espresso</Link>
        <div className="grid">
          {products.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </div>
    </div>
  );
}

export function InfoPage({ slug }) {
  const page = info[slug];
  if (!page) {
    return (
      <div className="page wrap">
        <h1>Page not found</h1>
        <Link href="/">Back to machines</Link>
      </div>
    );
  }
  return (
    <div className="page">
      <div className="wrap" style={{ maxWidth: 760 }}>
        <h1>{page.title}</h1>
        <p className="lede">{page.body}</p>
        <Link href="/">Continue shopping</Link>
      </div>
    </div>
  );
}
