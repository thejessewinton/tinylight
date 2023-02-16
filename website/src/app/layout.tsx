import { Inter, Newsreader } from "@next/font/google";
import "@/globals.css";
import { Header } from "@/components/Header";

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
      <body className="flex min-h-screen flex-col scroll-smooth leading-loose antialiased selection:bg-neutral-700 dark:bg-neutral-900 dark:text-neutral-200">
        <Header />
        <main className="mx-auto flex w-full flex-grow">
          {/* <Navigation /> */}
          <div className="flex flex-1 flex-col items-center justify-center">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
