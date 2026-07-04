import { yearsInBusiness } from "@/lib/business";

export default function TrustBar() {
  const items = [
    { big: `${yearsInBusiness()}`, small: "Years serving Tampa Bay" },
    { big: "Family", small: "Owned & operated" },
    { big: "Direct", small: "Factory-direct materials" },
    { big: "BBB", small: "Listed & accountable" },
  ];
  return (
    <section aria-label="Why homeowners trust us" className="border-b border-sand-200 bg-sand-100">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4">
        {items.map((item) => (
          <div key={item.small} className="text-center">
            <p className="font-display text-3xl font-bold text-clay-600">{item.big}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-espresso-600">{item.small}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
