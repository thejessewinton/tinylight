import { Footer } from "@/components/Footer";
import { Inter, Newsreader } from "@next/font/google";
import "../globals.css";

const inter = Inter({ variable: "--font-sans", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-serif", subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${newsreader.variable}`}>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/favicon.ico" rel="shortcut icon" />
      <body className="flex min-h-screen flex-col items-center justify-center scroll-smooth leading-loose antialiased selection:bg-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
        <main className="mx-auto flex w-full max-w-3xl flex-grow flex-col items-center justify-center px-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
