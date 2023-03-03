import { Inter, Newsreader, IBM_Plex_Mono as Mono } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/Header";
import { type Metadata } from "next";

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
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/favicon.ico" rel="shortcut icon" />
      <body className="flex min-h-screen flex-col scroll-smooth bg-neutral-900 leading-loose text-neutral-200 antialiased selection:bg-neutral-700">
        <Header />
        <main className="mx-auto flex w-full flex-grow">
          {/* <Navigation /> */}
          <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col p-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
