import Link from "next/link";

const items = [
  {
    label: "GitHub",
    link: "https://github.com/thejessewinton/tinylight",
  },
  {
    label: "About",
    link: "https://jessewinton.dev",
  },
];

export const Footer = () => {
  return (
    <footer className="animate-blur animation-delay-150 mb-0 mt-auto flex h-14 w-full items-center border-t border-t-neutral-700">
      <div className="mx-auto flex w-full max-w-3xl flex-row items-center justify-between gap-4 px-8 text-neutral-400">
        <nav className="flex items-center justify-between gap-6 text-sm">
          {items.map((item) => (
            <Link href={item.link} key={item.label} target="_blank">
              {item.label}
            </Link>
          ))}
        </nav>

        <span className="text-sm">OSS Rocks</span>
      </div>
    </footer>
  );
};
