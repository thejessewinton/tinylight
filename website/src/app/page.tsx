import Link from "next/link";

const Index = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <h1 className="text-center font-serif text-6xl font-light italic text-neutral-200">
        tinylight
        <span className="font-sans font-light not-italic"> primitives</span>
      </h1>
      <p className="mt-4 text-center font-sans text-xl text-neutral-300">
        Lightweight, unstyled lightbox primitives for React.
      </p>
      <Link
        href="/docs/getting-started"
        className="mt-16 hidden items-center gap-3 rounded-md border-b border-neutral-500 bg-neutral-300 px-5 py-1.5 font-medium text-neutral-900 md:flex"
      >
        Get Started
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          strokeWidth={1.5}
          className="h-4 w-4 stroke-neutral-900"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </Link>
    </div>
  );
};

export default Index;
