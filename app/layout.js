import "./globals.css";
import { Manrope, Newsreader } from "next/font/google";
import Providers from "@/components/Providers";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Automatic Espresso Machines | Vela",
  description:
    "Vela automatic espresso machines. Whole beans, one press, cafe drinks at home.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.className} style={{ "--font": manrope.style.fontFamily, "--serif": newsreader.style.fontFamily }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
