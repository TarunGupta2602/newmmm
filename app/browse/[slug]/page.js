"use client";

import { useParams } from "next/navigation";
import { BrowsePage } from "@/components/SimplePage";

export default function Page() {
  const params = useParams();
  return <BrowsePage slug={params.slug} />;
}
