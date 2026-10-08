"use client";

import { useParams } from "next/navigation";
import ProductView from "@/components/ProductView";

export default function ProductPage() {
  const params = useParams();
  return <ProductView slug={params.slug} />;
}
