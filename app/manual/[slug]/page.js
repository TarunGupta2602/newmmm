"use client";

import { useParams } from "next/navigation";
import ManualPage from "@/components/ManualPage";

export default function Page() {
  const params = useParams();
  return <ManualPage slug={params.slug} />;
}