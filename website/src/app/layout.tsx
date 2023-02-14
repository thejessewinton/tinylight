import { Inter } from '@next/font/google';
import { clsx } from 'clsx';
import '../globals.css';

const inter = Inter({ variable: '--font-serif', subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="/favicon.ico" rel="shortcut icon" />
      <body className="flex min-h-screen flex-col justify-center items-center scroll-smooth leading-loose antialiased selection:bg-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
        <main className="mx-auto flex w-full max-w-3xl flex-grow justify-center items-center flex-col px-8">
          {children}
        </main>
      </body>
    </html>
  );
}
