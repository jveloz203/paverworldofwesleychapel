import { business } from "@/lib/business";

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 bg-sand-50 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-clay-600">Good questions</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-espresso-900 sm:text-4xl">
          Everything homeowners ask us
        </h2>
        <div className="mt-8 space-y-3">
          {business.faqs.map((faq) => (
            <details key={faq.q} className="group rounded-xl bg-white p-4 shadow-sm ring-1 ring-sand-200">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-bold text-espresso-900">
                {faq.q}
                <span aria-hidden="true" className="text-clay-600 transition group-open:rotate-45">＋</span>
              </summary>
              <p className="mt-3 text-sm text-espresso-600">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
