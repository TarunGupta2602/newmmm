"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  products,
  priceBands,
  ranges,
  colors,
  milkOptions,
  searchProducts,
} from "@/data/products";
import ProductCard from "@/components/ProductCard";
import HomeStory from "@/components/HomeStory";

const faqs = [
  {
    q: "What does fully automatic mean here?",
    a: "Vela grinds whole beans, doses, and brews in one pass. Machines with a SilkFoam carafe also texture milk, so a cappuccino is a press instead of a pitcher and wand.",
  },
  {
    q: "Which range should I start with?",
    a: "Nova Start is the short menu. Nova Evo and Duo add more drinks and milk styles. Cambria is the pick when two roasts share the kitchen. Vista Explore and Atelier Reserve are for the long recipe list.",
  },
  {
    q: "Carafe or a steam wand?",
    a: "A carafe is faster and more repeatable on a weekday morning. A steam wand suits people who like finishing milk by hand, and it is the lower price on the manual Nova models.",
  },
  {
    q: "What does daily care look like?",
    a: "Rinse the milk parts after a milk drink, empty the tray and puck drawer, and run descale when the screen asks. The brew group lifts out for a rinse under the tap.",
  },
];

const emptyFilters = {
  ranges: [],
  colors: [],
  milk: [],
  prices: [],
  coldBrew: false,
  beanSwitch: false,
};

export default function Catalog() {
  const params = useSearchParams();
  const router = useRouter();
  const query = params.get("q") || "";
  const saleOnly = params.get("sale") === "1";
  const rangeParam = params.get("range") || "";
  const [filters, setFilters] = useState({
    ...emptyFilters,
    ranges: rangeParam ? [rangeParam] : [],
  });
  const [sort, setSort] = useState("featured");
  const [visible, setVisible] = useState(8);
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(filters);
  const [tab, setTab] = useState(params.get("tab") || "products");

  useEffect(() => {
    const next = params.get("tab");
    if (next) setTab(next);
  }, [params]);

  useEffect(() => {
    if (params.get("milk") === "1") {
      setFilters((current) => ({ ...current, milk: ["Automatic"] }));
      setTab("products");
    }
  }, [params]);

  useEffect(() => {
    if (!rangeParam) return;
    setFilters((current) => ({ ...current, ranges: [rangeParam] }));
    setVisible(8);
  }, [rangeParam]);

  const filtered = useMemo(() => {
    let list = query ? searchProducts(query) : [...products];
    if (saleOnly) list = list.filter((product) => product.compareAt);
    if (filters.ranges.length) list = list.filter((product) => filters.ranges.includes(product.range));
    if (filters.colors.length) list = list.filter((product) => filters.colors.includes(product.colorGroup));
    if (filters.milk.length) list = list.filter((product) => filters.milk.includes(product.milk));
    if (filters.prices.length) {
      list = list.filter((product) =>
        filters.prices.some((id) => {
          const band = priceBands.find((item) => item.id === id);
          return product.price >= band.min && product.price <= band.max;
        })
      );
    }
    if (filters.coldBrew) list = list.filter((product) => product.coldBrew);
    if (filters.beanSwitch) list = list.filter((product) => product.beanSwitch);
    if (sort === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "drinks") list.sort((a, b) => b.drinks - a.drinks);
    return list;
  }, [query, saleOnly, filters, sort]);

  const shown = filtered.slice(0, visible);
  const activeCount =
    filters.ranges.length +
    filters.colors.length +
    filters.milk.length +
    filters.prices.length +
    (filters.coldBrew ? 1 : 0) +
    (filters.beanSwitch ? 1 : 0) +
    (saleOnly ? 1 : 0);

  const toggleDraft = (key, value) => {
    setDraft((current) => {
      const has = current[key].includes(value);
      return {
        ...current,
        [key]: has ? current[key].filter((item) => item !== value) : [...current[key], value],
      };
    });
  };

  return (
    <div className="page">
      <div className="wrap">
        <div className="page-intro">
          <div className="page-head">
            <div className="crumbs">
              <a href="/">Coffee & Espresso</a>
              <span>||</span>
              <a href="/">Coffee Machines</a>
              <span>||</span>
              <span>Automatic Espresso Machines</span>
            </div>
            <h1>{saleOnly ? "Sale" : query ? `Search: ${query}` : "Automatic Espresso Machines"}</h1>
            <p className="lede">
              {query
                ? `Machines in the Vela catalog that match “${query}”.`
                : "Discover the fully automatic range and pour your favorite coffee at home."}
            </p>
          </div>
          {tab === "products" && (
            <div className="toolbar">
              <select className="sort" value={sort} aria-label="Order by" onChange={(event) => setSort(event.target.value)}>
                <option value="featured">Order by</option>
                <option value="price-asc">Price ascending</option>
                <option value="price-desc">Price descending</option>
                <option value="drinks">Most drinks</option>
              </select>
              <button className="line-btn" onClick={() => { setDraft(filters); setOpen(true); }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4" /></svg>
                All Filters{activeCount ? ` (${activeCount})` : ""}
              </button>
            </div>
          )}
        </div>

        {tab !== "products" && (
          <div className="plp-tabs" role="tablist">
            <button className={tab === "products" ? "on" : ""} onClick={() => setTab("products")}>Products <em>{filtered.length}</em></button>
            <button className={tab === "faq" ? "on" : ""} onClick={() => setTab("faq")}>Frequently Asked Questions <em>{faqs.length}</em></button>
            <button className={tab === "manuals" ? "on" : ""} onClick={() => setTab("manuals")}>Instruction Manuals <em>{products.length}</em></button>
          </div>
        )}

        {tab === "products" && (
          <>
            <p className="product-count">{filtered.length} PRODUCTS</p>
            {(query || saleOnly || activeCount > 0) && (
              <button className="ghost" style={{ marginBottom: 12 }} onClick={() => { setFilters(emptyFilters); setVisible(8); router.push("/"); }}>Clear</button>
            )}

            {filtered.length === 0 ? (
              <div className="empty">
                <h2>No machines match</h2>
                <p className="muted">Try another color, range, or search word.</p>
                <button className="solid" onClick={() => { setFilters(emptyFilters); router.push("/"); }}>Browse all</button>
              </div>
            ) : (
              <div className="grid">
                {shown.map((product) => <ProductCard key={product.slug} product={product} />)}
              </div>
            )}

            <p className="viewing">You are viewing {shown.length} of {filtered.length} products</p>
            {visible < filtered.length && (
              <div className="load-more">
                <button className="line-btn" onClick={() => setVisible((count) => count + 8)}>Load more products</button>
              </div>
            )}
          </>
        )}

        {tab === "faq" && (
          <div className="accordion">
            {faqs.map((item) => (
              <details key={item.q} open>
                <summary>{item.q}</summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        )}

        {tab === "manuals" && (
          <div className="manual-list">
            {products.map((product) => (
              <div className="manual-row" key={product.slug}>
                <img src={product.image} alt="" />
                <div>
                  <strong>{product.name}</strong>
                  <div className="muted">Model {product.id}</div>
                </div>
                <a className="line-btn" href={`/manual/${product.slug}`}>View manual</a>
              </div>
            ))}
          </div>
        )}

        {!query && !saleOnly && <HomeStory />}
      </div>

      {open && (
        <div className="filters" onClick={() => setOpen(false)}>
          <aside className="sheet" onClick={(event) => event.stopPropagation()}>
            <header>
              <h2>Filters</h2>
              <button className="icon-btn" onClick={() => setOpen(false)} aria-label="Close filters">×</button>
            </header>
            <Group title="Range" options={ranges} selected={draft.ranges} onToggle={(value) => toggleDraft("ranges", value)} />
            <Group title="Color" options={colors} selected={draft.colors} onToggle={(value) => toggleDraft("colors", value)} />
            <Group title="Milk" options={milkOptions} selected={draft.milk} onToggle={(value) => toggleDraft("milk", value)} />
            <h3>Price</h3>
            {priceBands.map((band) => (
              <label className="check" key={band.id}>
                <input type="checkbox" checked={draft.prices.includes(band.id)} onChange={() => toggleDraft("prices", band.id)} />
                {band.label}
              </label>
            ))}
            <h3>Features</h3>
            <label className="check">
              <input type="checkbox" checked={draft.coldBrew} onChange={() => setDraft({ ...draft, coldBrew: !draft.coldBrew })} />
              Cold brew
            </label>
            <label className="check">
              <input type="checkbox" checked={draft.beanSwitch} onChange={() => setDraft({ ...draft, beanSwitch: !draft.beanSwitch })} />
              Bean switch
            </label>
            <div className="sheet-actions">
              <button className="line-btn" onClick={() => setDraft(emptyFilters)}>Clear filters</button>
              <button className="solid" onClick={() => { setFilters(draft); setVisible(8); setOpen(false); }}>
                View items
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

function Group({ title, options, selected, onToggle }) {
  return (
    <>
      <h3>{title}</h3>
      {options.map((option) => (
        <label className="check" key={option}>
          <input type="checkbox" checked={selected.includes(option)} onChange={() => onToggle(option)} />
          {option}
        </label>
      ))}
    </>
  );
}
