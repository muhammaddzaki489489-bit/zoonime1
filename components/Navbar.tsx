import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300">
          🍥 Zoonime
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/ongoing">Ongoing</Link>
          <Link href="/complete">Complete</Link>
          <Link href="/genres">Genre</Link>
          <Link href="/jadwal">Jadwal</Link>
          <Link href="/search">Cari</Link>
        </nav>
      </div>
    </header>
  );
}