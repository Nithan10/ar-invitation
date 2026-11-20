import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Self-hosted (no runtime requests to Google Fonts)
const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  src: [
    { path: "./fonts/cormorant-garamond-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-500-italic.woff2", weight: "500", style: "italic" },
    { path: "./fonts/cormorant-garamond-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/cormorant-garamond-latin-600-italic.woff2", weight: "600", style: "italic" },
  ],
});

const cinzel = localFont({
  variable: "--font-cinzel",
  display: "swap",
  src: [
    { path: "./fonts/cinzel-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/cinzel-latin-600-normal.woff2", weight: "600" },
    { path: "./fonts/cinzel-latin-700-normal.woff2", weight: "700" },
  ],
});

const inter = localFont({
  variable: "--font-inter",
  display: "swap",
  src: [
    { path: "./fonts/inter-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/inter-latin-500-normal.woff2", weight: "500" },
    { path: "./fonts/inter-latin-600-normal.woff2", weight: "600" },
  ],
});

const script = localFont({
  variable: "--font-script",
  display: "swap",
  src: "./fonts/great-vibes-latin-400-normal.woff2",
});

export const metadata: Metadata = {
  title: "ARUN R | A Night to Remember",
  description:
    "You've received a special invitation from Arun R. Dinner at Arabian Majlis, Friday 27 November 2026, 7:30 PM.",
  openGraph: {
    title: "ARUN R | A Night to Remember",
    description: "A little celebration awaits… Open your invitation from Arun R.",
    type: "website",
  },
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#0B070D",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${cinzel.variable} ${inter.variable} ${script.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
