"use client";

import { useState } from "react";

export default function ServicePage() {
  const [zip, setZip] = useState("");
  const [place, setPlace] = useState(null);
  const [error, setError] = useState("");

  const search = (event) => {
    event.preventDefault();
    if (!/^\d{5}$/.test(zip.trim())) {
      setPlace(null);
      setError("Enter a 5-digit ZIP code.");
      return;
    }
    setError("");
    const code = zip.trim();
    setPlace({
      name: code === "10001" ? "Vela Care Manhattan" : `Vela Care near ${code}`,
      address: code === "10001" ? "410 W 31st Street, New York, NY" : `Demo desk for ZIP ${code}`,
      hours: "Mon–Sat, 9:00–6:00",
    });
  };

  return (
    <div className="page">
      <div className="wrap" style={{ maxWidth: 720 }}>
        <h1>Service locator</h1>
        <p className="lede">Find a care desk for rinse help, descale, or an out-of-warranty look. Results are sample locations for this demo.</p>
        <form className="promo" onSubmit={search}>
          <input aria-label="ZIP code" placeholder="ZIP code" value={zip} onChange={(event) => setZip(event.target.value)} />
          <button className="solid" type="submit">Search</button>
        </form>
        {error && <p>{error}</p>}
        {place && (
          <div className="panel" style={{ marginTop: 18 }}>
            <h2>{place.name}</h2>
            <p>{place.address}</p>
            <p className="muted">{place.hours}</p>
          </div>
        )}
      </div>
    </div>
  );
}
