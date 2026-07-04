"use client";

import { useState } from "react";
import Link from "next/link";
import { business } from "@/lib/business";

const NAV = [
  { href: "/#services", label: "Services" },
  { href: "/#why-us", label: "Why Us" },
  { href: "/commercial", label: "Commercial" },
  { href: "/about", label: "About" },
  { href: "/#reviews", label: "Reviews" },
  { href: "/#faq", label: "FAQ" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-sand-200 bg-sand-50/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label={`${business.name} home`}>
          <span className="grid h-9 w-9 grid-cols-2 gap-0.5 rounded-md bg-clay-600 p-1.5">
            <span className="rounded-[2px] bg-sand-50/90" />
            <span className="rounded-[2px] bg-sand-50/60" />
            <span className="rounded-[2px] bg-sand-50/60" />
            <span className="rounded-[2px] bg-sand-50/90" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-tight">Paver World</span>
            <span className="block text-[11px] uppercase tracking-widest text-espresso-600">of Wesley Chapel</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-espresso-700 hover:text-clay-600">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 sm:flex">
          <a href={`tel:${business.phone.tel}`} className="text-sm font-bold text-espresso-800 hover:text-clay-600">
            {business.phone.display}
          </a>
          <Link
            href="/#contact"
            className="rounded-lg bg-clay-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-clay-700"
          >
            Free Estimate
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="rounded-md border border-sand-300 p-2 lg:hidden"
        >
          <span className="block h-0.5 w-5 bg-espresso-800" />
          <span className="mt-1 block h-0.5 w-5 bg-espresso-800" />
          <span className="mt-1 block h-0.5 w-5 bg-espresso-800" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-sand-200 bg-sand-50 px-4 py-3 lg:hidden" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm font-medium text-espresso-700"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-clay-600 px-4 py-2 text-center text-sm font-bold text-white"
          >
            Free Estimate
          </Link>
        </nav>
      )}
    </header>
  );
}
