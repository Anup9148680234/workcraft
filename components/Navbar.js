import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Job<span className="text-blue-600">Finder</span>
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium text-gray-600">
          <Link href="/jobs" className="hover:text-black">
            Jobs
          </Link>

          <Link href="/saved" className="hover:text-black">
            Saved Jobs
          </Link>
        </div>
      </div>
    </nav>
  );
}