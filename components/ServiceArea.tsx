import { business } from "@/lib/business";
import PaverPattern from "@/components/PaverPattern";

export default function ServiceArea() {
  return (
    <section id="service-area" className="relative scroll-mt-24 overflow-hidden bg-sand-100 py-16">
      <PaverPattern className="absolute inset-0 h-full w-full text-espresso-900" opacity={0.04} />
      <div className="relative mx-auto max-w-6xl px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-clay-600">Where we work</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-espresso-900 sm:text-4xl">
          Proudly serving Wesley Chapel &amp; Tampa Bay
        </h2>
        <p className="mt-3 max-w-2xl text-espresso-600">
          Based right here at {business.address.street} — if you're in one of these communities, you're in our backyard.
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {business.serviceAreas.map((area) => (
            <li key={area} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-espresso-700 ring-1 ring-sand-300">
              📍 {area}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
