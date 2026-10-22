import { Chakra_Petch, JetBrains_Mono } from "next/font/google";
import SmoothScroll from "@/components/layout/SmoothScroll";
import { event } from "@/data/site";
import "./globals.css";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-chakra",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
  display: "swap",
});

const title = `${event.name} ${event.edition} — ${event.theme} | ${event.host}`;
const description = `${event.duration} hours. Build anything. The annual hackathon of ${event.host}.`;

export const metadata = {
  title,
  description,
  keywords: ["Hack36", "hackathon", "MNNIT", "Allahabad", "Prayagraj", "36 hour hackathon"],
  openGraph: { title, description, type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport = {
  themeColor: "#06060b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${chakra.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('js')`,
          }}
        />
      </head>
      <body>
        <SmoothScroll />
        {children}
        <div className="scanlines" aria-hidden="true" />
      </body>
    </html>
  );
}
