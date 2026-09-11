// types/portfolio.ts

export interface EventGallery {
  id: string;
  name: string; // e.g. "Wedding", "Sangeet", "Haldi"
  folder: string; // e.g. "wed"
  coverImage: string;
  images: string[];
}

export interface FilmDeliverables {
  reelUrl?: string;          // Vertical 9:16 (Instagram / YouTube Shorts)
  teaserUrl?: string;        // 1-2 min cinematic teaser
  highlightUrl?: string;     // 4-8 min highlight film
  fullWeddingFilmUrl?: string; // 25-60 min documentary/feature film
}

export interface Client {
  slug: string; // Unique URL slug: e.g. "simar-vasu"
  coupleNames: string; // "Simar & Vasu"
  featuredCover: string;
  date: string;
  location?: string;
  films: FilmDeliverables;
  events: EventGallery[];
}