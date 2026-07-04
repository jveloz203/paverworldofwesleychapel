import type { Metadata } from "next";
import { business, yearsInBusiness } from "@/lib/business";
import SmartImage from "@/components/SmartImage";
import ContactSection from "@/components/ContactSection";

export const metadata: Metadata = {
  title: "Commercial Paver Services",
  description: `Commercial hardscape installation for HOAs, builders, and property managers across Tampa Bay. Factory-direct materials at scale. Licensed & insured. ${business.phone.display}.`,
};

export default function CommercialPage() {
  return (
    <main>
      <section className="relative isolate overflow-hidden bg-espresso-900">
        <SmartImage slot="commercialHero" eager className="absolute inset-0 h-full w-full opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-espresso-900/90 to-espresso-900/40" />
        <div className="relative mx-auto max-w-6xl px-4 py-20">
          <p className="text-xs font-bold uppercase tracking-widest text-clay-400">Commercial services</p>
          <h1 className="mt-3 max-w-2xl font-display text-4xl font-bold text-sand-50 sm:text-5xl">
            Commercial hardscape, handled by one accountable local partner
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-sand-200">
            For {yearsInBusiness()} years, {business.name} has installed and maintained pavers for
            communities and businesses across Tampa Bay — with factory-direct material buying that
            keeps large projects on budget and on schedule.
          </p>
          <a
            href="#contact"
            className="mt-8 inline-block rounded-lg bg-clay-600 px-6 py-3 text-sm font-bold text-white hover:bg-clay-700"
          >
            Request a Commercial Consultation →
          </a>
        </div>
      </section>

      <section className="bg-sand-50 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-bold text-espresso-900">Who we work with</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {business.commercialAudiences.map((a) => (
              <div key={a.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sand-200">
                <h3 className="font-display text-xl font-bold text-espresso-900">{a.title}</h3>
                <p className="mt-2 text-sm text-espresso-600">{a.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand-100 py-16">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="font-display text-3xl font-bold text-espresso-900">
            Why commercial clients choose Paver World
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-3">
            <li className="rounded-2xl bg-white p-5 ring-1 ring-sand-200">
              <p className="font-bold text-espresso-900">Factory-direct at scale</p>
              <p className="mt-1 text-sm text-espresso-600">
                Direct manufacturer relationships mean volume pricing and reliable material supply —
                no distributor delays mid-project.
              </p>
            </li>
            <li className="rounded-2xl bg-white p-5 ring-1 ring-sand-200">
              <p className="font-bold text-espresso-900">Licensed &amp; insured</p>
              <p className="mt-1 text-sm text-espresso-600">
                Full commercial licensing and insurance, with documentation ready for your compliance files.
              </p>
            </li>
            <li className="rounded-2xl bg-white p-5 ring-1 ring-sand-200">
              <p className="font-bold text-espresso-900">Owner on every job</p>
              <p className="mt-1 text-sm text-espresso-600">
                You deal with Pete — not a rotating cast of project managers. One call, one accountable answer.
              </p>
            </li>
          </ul>
        </div>
      </section>

      <ContactSection source="commercial-form" heading="Tell us about your property" />
    </main>
  );
}
