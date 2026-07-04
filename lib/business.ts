export const FOUNDED_YEAR = 2006;

export function yearsInBusiness(currentYear = new Date().getFullYear()): number {
  return currentYear - FOUNDED_YEAR;
}

export const business = {
  name: "Paver World of Wesley Chapel",
  legalName: "Paver World of Wesley Chapel, Inc.",
  tagline: "Wesley Chapel's Trusted Paver Craftsmen — Family Owned Since 2006",
  owners: "Paver Pete and his wife Catherine",
  foundedYear: FOUNDED_YEAR,
  phone: { display: "(813) 994-8805", tel: "+18139948805" },
  email: "paverworldofwesleychapel@gmail.com",
  address: {
    street: "30141 State Road 54",
    city: "Wesley Chapel",
    state: "FL",
    zip: "33543",
  },
  hours: "Monday–Friday, 9am–5pm",
  hoursSchema: { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "17:00" },
  geo: { lat: 28.2394, lng: -82.3279 },
  social: {
    instagram: "https://www.instagram.com/paverworld/",
    facebook: "https://www.facebook.com/p/Paver-World-of-Wesley-Chapel-100083262546591/",
  },
  services: [
    {
      slug: "patios",
      name: "Paver Patios",
      blurb: "Custom-designed outdoor living spaces built to gather, grill, and unwind — Florida evenings done right.",
      benefit: "Turn your backyard into your favorite room",
    },
    {
      slug: "driveways",
      name: "Driveways",
      blurb: "Interlocking paver driveways that boost curb appeal and stand up to Florida sun, rain, and daily life.",
      benefit: "Curb appeal that adds real home value",
    },
    {
      slug: "pool-decks",
      name: "Pool Decks",
      blurb: "Cool-underfoot, slip-resistant paver decks and remodels that make your pool the centerpiece of the yard.",
      benefit: "Safe, beautiful, built for barefoot summers",
    },
    {
      slug: "walkways",
      name: "Walkways",
      blurb: "Welcoming paths and entries that tie your landscape together and guide guests to your door.",
      benefit: "First impressions, laid brick by brick",
    },
    {
      slug: "fire-pits",
      name: "Fire Pits",
      blurb: "Built-in fire pits and seating walls for year-round evenings outside with family and friends.",
      benefit: "Your backyard's new gathering point",
    },
    {
      slug: "retaining-walls",
      name: "Retaining Walls",
      blurb: "Structural and decorative walls that solve grade problems and frame planting beds beautifully.",
      benefit: "Function and form, engineered to last",
    },
  ],
  differentiators: [
    {
      title: "Family Owned Since 2006",
      detail: "Paver Pete and Catherine have served Wesley Chapel neighbors for nearly two decades — your handshake is with the owner.",
    },
    {
      title: "Factory-Direct Materials",
      detail: "We buy pavers straight from the manufacturer. No middleman markup, first pick of inventory, and faster job starts.",
    },
    {
      title: "Licensed & Insured",
      detail: "Fully licensed and insured for residential and commercial hardscape work across Pasco and Hillsborough counties.",
    },
    {
      title: "Free Design Estimates",
      detail: "Every project starts with a free on-site design consultation and a clear, itemized quote. No pressure, no surprises.",
    },
  ],
  serviceAreas: [
    "Wesley Chapel",
    "New Tampa",
    "Land O' Lakes",
    "Lutz",
    "Zephyrhills",
    "San Antonio",
    "Dade City",
    "Trinity",
    "Odessa",
    "Tampa",
  ],
  commercialAudiences: [
    {
      title: "HOAs & Communities",
      detail: "Streetscapes, community entrances, sidewalks, and amenity areas maintained on schedule and on budget.",
    },
    {
      title: "Builders & Developers",
      detail: "Production-ready paver installation for new construction — driveways, lanais, and model homes that sell.",
    },
    {
      title: "Property Managers",
      detail: "Repairs, lifts, and refreshes across your portfolio with one accountable local point of contact.",
    },
    {
      title: "Commercial Properties",
      detail: "Plazas, walkways, and parking areas engineered for traffic loads and built with minimal disruption.",
    },
  ],
  process: [
    {
      step: "Free Design Consultation",
      detail: "We visit your property, listen to what you want, measure, and talk materials and layout options.",
    },
    {
      step: "Clear Custom Quote",
      detail: "You get an itemized quote with factory-direct material pricing. No hidden costs, no pressure.",
    },
    {
      step: "Expert Installation",
      detail: "Our experienced crew preps the base right, lays every paver true, and keeps the site clean daily.",
    },
    {
      step: "Final Walkthrough",
      detail: "We walk the finished project with you and stand behind our workmanship after the last paver is set.",
    },
  ],
  faqs: [
    {
      q: "How much do pavers cost?",
      a: "Every project is different — size, material, and site prep drive the price. Because we buy materials factory-direct, our pricing is consistently competitive. The best first step is a free on-site estimate with an itemized quote.",
    },
    {
      q: "How long does installation take?",
      a: "Most residential patios, driveways, and pool decks take a few days to a week once materials arrive. Buying direct from the manufacturer means we schedule jobs sooner and keep them moving.",
    },
    {
      q: "Do I need a permit?",
      a: "Some hardscape projects in Pasco and Hillsborough counties require permits. We'll tell you exactly what your project needs during the free consultation and help handle the process.",
    },
    {
      q: "Should my pavers be sealed?",
      a: "Sealing enhances color and protects against stains and Florida weather. We'll recommend the right approach for your material during your estimate — it's worthwhile on most installations.",
    },
    {
      q: "Are you licensed and insured?",
      a: "Yes — Paver World of Wesley Chapel is fully licensed and insured for residential and commercial hardscape work.",
    },
    {
      q: "Do you handle commercial projects?",
      a: "Yes. We work with HOAs, builders, property managers, and commercial properties across the Tampa Bay area. Factory-direct buying really shines at commercial scale.",
    },
  ],
  testimonials: [
    {
      quote: "We had driveway extension pavers and a path to the back gate installed. It turned out so beautiful and we are thrilled with the results. Everyone in the neighborhood is complimenting the work. ",
      name: "Jennifer",
      source: "Google",
    },
    {
      quote: "I did my backyard with Paver World Wesley Chapel, and they were amazing! They took care of every detail and did a beautiful job.",
      name: "Hamza",
      source: "Google",
    },
    {
      quote: "I recently had the pleasure of working with Paver World of Wesley Chapel, a family-owned business. From start to finish, their dedication to delivering high-quality work and outstanding customer service was evident",
      name: "Juan",
      source: "Google",
    },
  ],
} as const;

export type Service = (typeof business.services)[number];
