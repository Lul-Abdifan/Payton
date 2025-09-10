import Link from 'next/link';

/**
 * Shared layout for core pages. Provides a header, footer and a main
 * container for page content. The header links to search and cart
 * placeholders. Extend this component with additional navigation items
 * as more routes are implemented.
 */
export default function CoreLayout({ children }: { children: React.ReactNode }) {
  const year = new Date().getFullYear();
  return (
    <>
      <header className="border-b p-4 flex items-center justify-between bg-white sticky top-0 z-10">
        <Link href="/" className="text-xl font-bold text-indigo-600">
          Payton Suite
        </Link>
        <nav className="space-x-4 text-sm">
          <Link href="/search" className="hover:underline">
            Search
          </Link>
          <Link href="/cart" className="hover:underline">
            Cart
          </Link>
        </nav>
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer className="border-t p-4 text-center text-xs text-gray-500 bg-gray-50">
        © {year} Payton Suite
      </footer>
    </>
  );
}