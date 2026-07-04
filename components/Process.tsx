import { business } from "@/lib/business";

export default function Process() {
  return (
    <section id="process" className="scroll-mt-24 bg-sand-100 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-clay-600">How it works</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-espresso-900 sm:text-4xl">
          Simple, honest, start to finish
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {business.process.map((p, i) => (
            <div key={p.step} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sand-200">
              <p className="font-display text-3xl font-bold text-clay-600">{i + 1}</p>
              <p className="mt-2 font-bold text-espresso-900">{p.step}</p>
              <p className="mt-1 text-sm text-espresso-600">{p.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
