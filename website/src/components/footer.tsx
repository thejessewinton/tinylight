import Link from 'next/link'

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/thejessewinton/tinylight',
  },
]

export const Footer = () => {
  return (
    <footer className="mt-auto mb-0 flex h-14 w-full max-w-3xl items-center justify-between px-8 text-neutral-400">
      <nav className="group flex items-center justify-between gap-6 text-sm">
        {links.map((link) => (
          <Link
            href={link.href}
            className="transition-all md:group-hover:opacity-40 md:group-hover:blur-xs md:hover:opacity-100! md:hover:blur-none!"
            key={link.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <span className="text-sm">&copy;{new Date().getFullYear()}</span>
    </footer>
  )
}
