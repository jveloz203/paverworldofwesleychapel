import { business } from "@/lib/business";
import QuoteForm from "@/components/QuoteForm";

export default function ContactSection({
  source = "contact-form",
  heading = "Ready to love your outdoor space?",
}: {
  source?: "contact-form" | "commercial-form";
  heading?: string;
}) {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-sand-200 bg-sand-100 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-3xl font-bold text-espresso-900 sm:text-4xl">{heading}</h2>
          <p className="mt-3 max-w-md text-espresso-600">
            Tell us about your project and we'll schedule a free on-site design consultation —
            or just call and talk to us directly.
          </p>
          <div className="mt-8 space-y-4 text-sm">
            <p>
              <span className="font-bold text-espresso-900">Call or text:</span>{" "}
              <a href={`tel:${business.phone.tel}`} className="font-bold text-clay-600 hover:underline">{business.phone.display}</a>
            </p>
            <p>
              <span className="font-bold text-espresso-900">Email:</span>{" "}
              <a href={`mailto:${business.email}`} className="text-clay-600 hover:underline">{business.email}</a>
            </p>
            <p>
              <span className="font-bold text-espresso-900">Visit:</span>{" "}
              {business.address.street}, {business.address.city}, {business.address.state} {business.address.zip}
            </p>
            <p>
              <span className="font-bold text-espresso-900">Hours:</span> {business.hours}
            </p>
          </div>
        </div>
        <QuoteForm source={source} showEmail showMessage showCompany={source === "commercial-form"} heading="Send us your project" />
      </div>
    </section>
  );
}
