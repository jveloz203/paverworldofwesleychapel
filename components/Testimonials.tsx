import { business } from "@/lib/business";

export default function Testimonials() {
  return (
    <section id="reviews" className="scroll-mt-24 bg-sand-50 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <p className="text-xs font-bold uppercase tracking-widest text-clay-600">Neighbors talking</p>
        <h2 className="mt-2 font-display text-3xl font-bold text-espresso-900 sm:text-4xl">
          Trusted across Wesley Chapel
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {business.testimonials.map((t, i) => (
            <figure key={i} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sand-200">
              <p aria-hidden="true" className="text-clay-500">★★★★★</p>
              <blockquote className="mt-2 text-sm text-espresso-700">"{t.quote}"</blockquote>
              <figcaption className="mt-3 text-xs font-semibold text-espresso-500">
                {t.name} · via {t.source}
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-sm text-espresso-600">
          Read more on{" "}
          <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" className="font-bold text-clay-600 hover:underline">Facebook</a>{" "}
          and{" "}
          <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" className="font-bold text-clay-600 hover:underline">Instagram</a>.
        </p>
      </div>
    </section>
  );
}
