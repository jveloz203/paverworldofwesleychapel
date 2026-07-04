export type ImageSlot =
  | "hero"
  | "patios"
  | "driveways"
  | "pool-decks"
  | "walkways"
  | "fire-pits"
  | "retaining-walls"
  | "directMaterials"
  | "commercialHero"
  | "about";

export interface SiteImage {
  url: string;
  alt: string;
}

const u = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;

// Stock photos (Unsplash CDN). Replace any entry with a real project photo by
// swapping the url (e.g. "/images/patio-1.jpg" served from public/images/).
// SmartImage renders a designed fallback automatically if a URL stops resolving.
export const images: Record<ImageSlot, SiteImage> = {
  hero: {
    url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    alt: "Florida modern farmhouse home with a beautiful paver driveway and walkway on a sunny day",
  },
  patios: {
    url: u("photo-1600210492486-724fe5c67fb0"),
    alt: "Backyard paver patio with outdoor seating",
  },
  driveways: {
    url: u("photo-1605146769289-440113cc3d00"),
    alt: "Home with a wide interlocking paver driveway",
  },
  "pool-decks": {
    url: u("photo-1572331165267-854da2b10ccc"),
    alt: "Swimming pool surrounded by a paver pool deck",
  },
  walkways: {
    url: u("photo-1558904541-efa843a96f01"),
    alt: "Paver walkway winding through a landscaped yard",
  },
  "fire-pits": {
    url: u("photo-1523301343968-6a6ebf63c672"),
    alt: "Built-in fire pit on a paver patio at dusk",
  },
  "retaining-walls": {
    url: u("photo-1621293954908-907159247fc8"),
    alt: "Stone retaining wall framing a garden bed",
  },
  directMaterials: {
    url: u("photo-1581094794329-c8112a89af12"),
    alt: "Stacked paver materials ready for installation",
  },
  commercialHero: {
    url: u("photo-1486406146926-c627a92ad1ab"),
    alt: "Commercial property with hardscaped entry",
  },
  about: {
    url: u("photo-1600880292203-757bb62b4baf"),
    alt: "Handshake between a contractor and homeowner",
  },
};
