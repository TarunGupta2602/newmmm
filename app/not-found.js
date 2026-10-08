import Link from "next/link";

export default function NotFound() {
  return (
    <div className="page wrap">
      <h1>Page not found</h1>
      <p>That link is outside this demo.</p>
      <Link href="/">Back to Vela machines</Link>
    </div>
  );
}
