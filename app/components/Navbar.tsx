"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="absolute left-0 top-0 z-50 w-full px-6 py-6 md:px-10">
      <nav className="flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-medium tracking-[0.25em]"
        >
          SKINSTRIC
        </Link>

        <Link
          href="/results"
          className="text-xs tracking-[0.2em] text-gray-500 transition hover:text-black"
        >
          ANALYSIS
        </Link>
      </nav>
    </header>
  );
}