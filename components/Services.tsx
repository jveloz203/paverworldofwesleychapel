import Link from "next/link";
import { business } from "@/lib/business";
import SmartImage from "@/components/SmartImage";
import type { ImageSlot } from "@/lib/images";

export default function Services() {
  return (
    <section id="services" className="scroll-mt-24 bg-sand-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-clay-600">What we build</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-espresso-900 sm:text-4xl">
          Crafted for Florida living
        </h2>
        <p className="mt-3 max-w-2xl text-espresso-600">
          Every project is designed around your home, installed on a properly compacted base, and
          finished like we'd want our own backyard done.
        </p>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {business.services.map((service) => (
            <article
              key={service.slug}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sand-200 transition hover:shadow-md"
            >
              <SmartImage slot={service.slug as ImageSlot} className="h-44 w-full transition duration-300 group-hover:scale-[1.02]" />
              <div className="p-5">
                <h3 className="font-display text-xl font-bold text-espresso-900">{service.name}</h3>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-sage-600">{service.benefit}</p>
                <p className="mt-2 text-sm text-espresso-600">{service.blurb}</p>
                <Link href="/#contact" className="mt-3 inline-block text-sm font-bold text-clay-600 hover:text-clay-700">
                  Get a free estimate →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
