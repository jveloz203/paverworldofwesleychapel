import Link from "next/link";

export default function CommercialTeaser() {
  return (
    <section className="bg-sand-50 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 rounded-2xl bg-espresso-800 px-6 py-8 sm:mx-4 sm:flex-row sm:items-center lg:mx-auto">
        <div>
          <h2 className="font-display text-2xl font-bold text-sand-50">
            HOA, builder, or property manager?
          </h2>
          <p className="mt-1 text-sm text-sand-300">
            Factory-direct buying really shines at commercial scale — one accountable local crew for your whole portfolio.
          </p>
        </div>
        <Link
          href="/commercial"
          className="shrink-0 rounded-lg bg-clay-600 px-5 py-3 text-sm font-bold text-white hover:bg-clay-700"
        >
          Commercial Services →
        </Link>
      </div>
    </section>
  );
}
