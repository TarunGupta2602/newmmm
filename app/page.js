import { Suspense } from "react";
import Catalog from "@/components/Catalog";

export default function HomePage() {
  return (
    <Suspense fallback={<div className="page-loading">Loading machines…</div>}>
      <Catalog />
    </Suspense>
  );
}
