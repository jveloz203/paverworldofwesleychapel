import Link from "next/link";
import { business } from "@/lib/business";

export default function StickyMobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-sand-200 bg-sand-50/95 backdrop-blur sm:hidden">
      <a
        href={`tel:${business.phone.tel}`}
        className="flex items-center justify-center gap-2 py-3 text-sm font-bold text-espresso-800"
      >
        📞 Call Now
      </a>
      <Link
        href="/#contact"
        className="flex items-center justify-center gap-2 bg-clay-600 py-3 text-sm font-bold text-white"
      >
        Free Estimate
      </Link>
    </div>
  );
}
