"use client";

import { useParams } from "next/navigation";
import { InfoPage } from "@/components/SimplePage";

export default function Page() {
  const params = useParams();
  return <InfoPage slug={params.slug} />;
}
