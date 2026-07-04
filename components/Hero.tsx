import { business, yearsInBusiness } from "@/lib/business";
import SmartImage from "@/components/SmartImage";

const TRUST_CHIPS = ["Licensed & Insured", "Factory-Direct Materials", "Free Estimates"];

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-espresso-900">
      <SmartImage slot="hero" eager className="absolute inset-0 h-full w-full opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-r from-espresso-900/90 via-espresso-900/70 to-espresso-900/30" />
      <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:py-24">
        <p className="inline-block rounded-full bg-clay-600/20 px-3 py-1 text-xs font-bold uppercase tracking-widest text-clay-300 ring-1 ring-clay-500/40">
          Family Owned in Wesley Chapel Since {business.foundedYear}
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold leading-tight text-sand-50 sm:text-5xl">
          Wesley Chapel's Trusted
          <span className="text-clay-400"> Paver Craftsmen</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-sand-200">
          Patios, driveways, and pool decks built to last by {business.owners} — {yearsInBusiness()} years
          of local craftsmanship, with materials bought factory-direct so you get more paver for your dollar.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {TRUST_CHIPS.map((chip) => (
            <span key={chip} className="rounded-full bg-sand-50/10 px-3 py-1.5 text-xs font-semibold text-sand-100 ring-1 ring-sand-50/25">
              ✓ {chip}
            </span>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#contact"
            className="rounded-lg bg-clay-600 px-6 py-3 text-sm font-bold text-sand-50 shadow hover:bg-clay-700"
          >
            Get My Free Estimate
          </a>
          <a
            href={`tel:${business.phone.tel}`}
            className="rounded-lg bg-sand-50 px-6 py-3 text-sm font-bold text-espresso-900 shadow hover:bg-sand-100"
          >
            📞 Call {business.phone.display}
          </a>
        </div>
      </div>
    </section>
  );
}
