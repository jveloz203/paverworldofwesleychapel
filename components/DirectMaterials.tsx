import { business } from "@/lib/business";
import SmartImage from "@/components/SmartImage";

export default function DirectMaterials() {
  return (
    <section id="why-us" className="scroll-mt-24 bg-espresso-900 py-16 text-sand-100">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 lg:grid-cols-2">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-clay-400">The Paver World difference</p>
          <h2 className="mt-2 font-display text-3xl font-bold text-sand-50 sm:text-4xl">
            We buy direct from the manufacturer. You keep the difference.
          </h2>
          <p className="mt-4 text-sand-200">
            Most installers buy pavers through distributors and pass the markup on to you. We buy
            factory-direct — which means sharper pricing, first pick of colors and styles, and jobs
            that start sooner because we're not waiting in a supplier's queue.
          </p>
          <ul className="mt-6 space-y-4">
            {business.differentiators.map((d) => (
              <li key={d.title} className="flex gap-3">
                <span aria-hidden="true" className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-sage-600 text-xs font-bold text-white">✓</span>
                <div>
                  <p className="font-bold text-sand-50">{d.title}</p>
                  <p className="text-sm text-sand-300">{d.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <SmartImage slot="directMaterials" className="h-80 w-full rounded-2xl lg:h-[28rem]" />
      </div>
    </section>
  );
}
