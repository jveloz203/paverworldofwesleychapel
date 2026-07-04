import Link from "next/link";
import { business, yearsInBusiness } from "@/lib/business";

export default function Footer() {
  return (
    <footer className="bg-espresso-900 pb-24 pt-12 text-sand-200 sm:pb-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-3">
        <div>
          <p className="font-display text-lg font-bold text-sand-50">{business.name}</p>
          <p className="mt-2 text-sm text-sand-300">
            Family owned and operated since {business.foundedYear} — {yearsInBusiness()} years of
            craftsmanship in Wesley Chapel and the greater Tampa Bay area. Licensed &amp; insured.
          </p>
          <div className="mt-3 flex gap-4 text-sm">
            <a href={business.social.instagram} rel="noopener noreferrer" target="_blank" className="hover:text-clay-300">Instagram</a>
            <a href={business.social.facebook} rel="noopener noreferrer" target="_blank" className="hover:text-clay-300">Facebook</a>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-sand-50">Services</p>
          <ul className="mt-2 space-y-1 text-sm">
            {business.services.map((s) => (
              <li key={s.slug}>
                <Link href="/#services" className="hover:text-clay-300">{s.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-wider text-sand-50">Contact</p>
          <address className="mt-2 space-y-1 text-sm not-italic">
            <p>{business.address.street}</p>
            <p>{business.address.city}, {business.address.state} {business.address.zip}</p>
            <p>{business.hours}</p>
            <p>
              <a href={`tel:${business.phone.tel}`} className="font-bold text-clay-300 hover:text-clay-200">
                {business.phone.display}
              </a>
            </p>
            <p>
              <a href={`mailto:${business.email}`} className="hover:text-clay-300">{business.email}</a>
            </p>
          </address>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-4 text-xs text-sand-300/70">
        © {new Date().getFullYear()} {business.legalName} All rights reserved.
      </p>
    </footer>
  );
}
