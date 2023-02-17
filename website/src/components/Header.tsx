"use client";

import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";
import { clsx } from "clsx";

const REPO = "https://github.com/thejessewinton/tinylight";

const items = [
  {
    title: "Getting Started",
    href: "/docs/getting-started",
  },
  // {
  //   title: "Demo",
  //   href: "/docs/demo",
  // },
];

export const Header = () => {
  const [_, path] = useSelectedLayoutSegments();

  return (
    <header className="sticky top-0 z-10 mx-auto flex h-14 w-full items-center justify-between border-b border-dotted border-neutral-700 bg-neutral-900/75 px-8 backdrop-blur-sm sm:px-8 lg:h-20">
      <Link
        href="/"
        className="flex items-center justify-center gap-2 space-x-2 py-8 font-serif text-lg font-light italic"
      >
        tinylight
        <span className="rounded-md border-b border-neutral-500 bg-neutral-300 px-1 py-0.5 text-center font-sans text-xs font-medium not-italic text-neutral-900 selection:text-white">
          beta
        </span>
      </Link>

      <nav className="hidden items-center justify-center gap-6 text-sm font-medium">
        {items.map((item) => {
          return (
            <Link
              key={item.title}
              href={item.href}
              className={clsx(
                "border-b border-dotted",
                path === item.href.split("/")[2]
                  ? "border-neutral-200"
                  : "border-transparent"
              )}
            >
              {item.title}
            </Link>
          );
        })}
      </nav>

      <Link
        href={REPO}
        target="_blank"
        className="flex items-center gap-1 rounded-md border-b border-neutral-500 bg-neutral-300 px-2 py-1.5 text-xs font-medium text-neutral-900"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className="h-4 w-4 fill-slate-900"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"
          />
        </svg>
        Star on Github
      </Link>
    </header>
  );
};
