import { business, yearsInBusiness } from "@/lib/business";

const { phone, address, hours } = business;

interface Intent {
  id: string;
  pattern: RegExp;
  reply: () => string;
}

// Order matters: first match wins. More specific intents come before general ones.
const intents: Intent[] = [
  {
    id: "cost",
    pattern: /\b(cost|price|pricing|how much|quote|estimate cost|expensive|budget)\b/i,
    reply: () =>
      `Every project is different, so we don't quote prices without seeing the space — but because we buy materials factory-direct, our pricing is consistently competitive. The best next step is a free on-site estimate: use the quote form on this page or call ${phone.display}.`,
  },
  {
    id: "schedule",
    pattern: /\b(schedule|book|appointment|consultation|come out|visit|set up|arrange|estimate)\b/i,
    reply: () =>
      `We'd love to take a look! Estimates are always free — fill out the quote form on this page or call ${phone.display} (${hours}) and we'll set up a time that works for you.`,
  },
  {
    id: "pool-decks",
    pattern: /\b(pool)\b/i,
    reply: () =>
      `Yes — pool decks are one of our specialties! We build slip-resistant, cool-underfoot paver pool decks and remodels. Want a free design estimate? Use the quote form or call ${phone.display}.`,
  },
  {
    id: "commercial",
    pattern: /\b(commercial|hoa|builder|property manager|community|development|business)\b/i,
    reply: () =>
      `Yes, we handle commercial work — HOAs, builders, property managers, and commercial properties across the Tampa Bay area. Factory-direct material buying really pays off at commercial scale. Call ${phone.display} or use the commercial contact form to talk about your project.`,
  },
  {
    id: "materials",
    pattern: /\b(material|manufacturer|brand|factory|direct|supplier|where do you (get|buy))\b/i,
    reply: () =>
      `We buy our pavers factory-direct from the manufacturer — no middleman markup, first pick of inventory, and faster job starts. Those savings get passed straight to you.`,
  },
  {
    id: "licensing",
    pattern: /\b(licensed?|insured?|insurance|certif)\b/i,
    reply: () =>
      `Yes — Paver World of Wesley Chapel is fully licensed and insured for residential and commercial hardscape work.`,
  },
  {
    id: "area",
    pattern: /\b(serve|service area|come to|work in|near me|land o'? ?lakes|lutz|zephyrhills|new tampa|tampa|dade city|trinity|odessa|san antonio)\b/i,
    reply: () =>
      `We serve ${business.serviceAreas.slice(0, -1).join(", ")} and ${business.serviceAreas.at(-1)} — basically Wesley Chapel and the surrounding Pasco and Hillsborough communities. If you're nearby, we've got you covered!`,
  },
  {
    id: "hours",
    pattern: /\b(hours|open|closed|location|address|where are you|showroom)\b/i,
    reply: () =>
      `You'll find us at ${address.street}, ${address.city}, ${address.state} ${address.zip}. We're open ${hours}. Call ${phone.display} any time in those hours.`,
  },
  {
    id: "services",
    pattern: /\b(services?|what do you (do|offer)|driveway|patio|walkway|fire ?pit|retaining wall|paver)\b/i,
    reply: () =>
      `We design and install paver patios, driveways, pool decks, walkways, fire pits, and retaining walls — residential and commercial. Which project are you thinking about?`,
  },
  {
    id: "greeting",
    pattern: /\b(hi|hello|hey|good (morning|afternoon|evening))\b/i,
    reply: () =>
      `Hi there! Welcome to Paver World of Wesley Chapel — family owned and serving the area for ${yearsInBusiness()} years. Ask me about patios, driveways, pool decks, or anything paver-related!`,
  },
];

const DEFAULT_REPLY = () =>
  `Great question! I'm a simple assistant, so for anything I can't answer the fastest route is Paver Pete himself: call ${phone.display} (${hours}) or request a free estimate with the quote form on this page.`;

export function fallbackReply(userMessage: string): string {
  const intent = intents.find((i) => i.pattern.test(userMessage));
  return (intent?.reply ?? DEFAULT_REPLY)();
}
