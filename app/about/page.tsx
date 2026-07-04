import type { Metadata } from "next";
import { business, yearsInBusiness } from "@/lib/business";
import SmartImage from "@/components/SmartImage";
import QuoteForm from "@/components/QuoteForm";

export const metadata: Metadata = {
  title: "About Us — Family Owned Since 2006",
  description: `Meet Paver Pete and Catherine — the family behind ${business.name}, serving Wesley Chapel and Tampa Bay since ${business.foundedYear}.`,
};

export default function AboutPage() {
  return (
    <main>
      <section className="bg-sand-100 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-clay-600">Our story</p>
            <h1 className="mt-3 font-display text-4xl font-bold text-espresso-900 sm:text-5xl">
              A family business, built one paver at a time
            </h1>
            <p className="mt-4 text-espresso-700">
              {business.name} started in {business.foundedYear}, when {business.owners} decided that
              Wesley Chapel deserved a paver company that treats every driveway, patio, and pool deck
              like it's in the family's own backyard.
            </p>
            <p className="mt-4 text-espresso-700">
              {yearsInBusiness()} years later, that's still how it works. Pete walks every job. Catherine
              keeps every project honest and on schedule. And because we buy our materials factory-direct,
              our neighbors get premium pavers without the middleman markup.
            </p>
            <p className="mt-4 text-espresso-700">
              From single walkways to entire community streetscapes, our name is on every job — and in a
              town like Wesley Chapel, your name is everything.
            </p>
          </div>
          <SmartImage slot="about" className="h-80 w-full rounded-2xl lg:h-[26rem]" />
        </div>
      </section>

      <section className="bg-sand-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-bold text-espresso-900">What we believe</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {business.differentiators.map((d) => (
              <div key={d.title} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sand-200">
                <p className="font-bold text-espresso-900">{d.title}</p>
                <p className="mt-1 text-sm text-espresso-600">{d.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-100 py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold text-espresso-900">
              Come say hi — or let's talk about your yard
            </h2>
            <p className="mt-3 text-espresso-600">
              Find us at {business.address.street}, {business.address.city} ({business.hours}), call{" "}
              <a href={`tel:${business.phone.tel}`} className="font-bold text-clay-600">{business.phone.display}</a>,
              or request your free estimate right here.
            </p>
          </div>
          <QuoteForm heading="Start with a free estimate" showEmail />
        </div>
      </section>
    </main>
  );
}
