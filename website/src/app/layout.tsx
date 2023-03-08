import { Inter, Newsreader, IBM_Plex_Mono as Mono } from "next/font/google";
import "@/styles/globals.css";
import { type Metadata } from "next";
import { Footer } from "@/components/footer/Footer";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-serif", subsets: ["latin"] });
const mono = Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "tinylight",
    template: "%s — tinylight",
  },
  description:
    "🎉 A set of small, unopinionated component primitives for building lightbox components in React.",
  openGraph: {
    title: "tinylight",
    siteName: "tinylight",
    url: process.env.NEXT_PUBLIC_URL,
    type: "website",
    images: [`${process.env.NEXT_PUBLIC_URL}/og.jpg`],
    description:
      "🎉 A set of small, unopinionated component primitives for building lightbox components in React.",
  },
  twitter: {
    card: "summary_large_image",
    images: [`${process.env.NEXT_PUBLIC_URL}/og.jpg`],
    description:
      "🎉 A set of small, unopinionated component primitives for building lightbox components in React.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${newsreader.variable} ${mono.variable}`}
    >
      <link href="/favicon.ico" rel="shortcut icon" />
      <body className="flex min-h-screen flex-col items-center justify-center scroll-smooth font-light leading-loose text-neutral-900 antialiased selection:bg-neutral-600 selection:text-white dark:bg-neutral-900 dark:text-neutral-200">
        <main className="mx-auto mt-32 w-full max-w-3xl items-center justify-center px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
