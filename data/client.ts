export interface EventGallery {
  id: string;
  name: string;
  folder: string;
  coverImage: string;
  images: string[];
}

export interface FilmDeliverables {
  reelUrl?: string;
  reelThumbnail?: string;
  reelPriority?: number;
  reelAllPriority?: number;

  teaserUrl?: string;
  teaserThumbnail?: string;
  teaserPriority?: number;
  teaserAllPriority?: number;

  highlightUrl?: string;
  highlightThumbnail?: string;
  highlightPriority?: number;
  highlightAllPriority?: number;

  preWeddingFilmUrl?: string;
  preWeddingFilmThumbnail?: string;
  preWeddingPriority?: number;
  preWeddingAllPriority?: number;

  fullWeddingFilmUrl?: string;
  fullWeddingFilmThumbnail?: string;
  fullWeddingFilmPriority?: number;
  fullWeddingFilmAllPriority?: number;

  weddingFilmUrl?: string;
  weddingFilmThumbnail?: string;
  weddingFilmPriority?: number;
  weddingFilmAllPriority?: number;
}

export type ClientService =
  | 'Photography'
  | 'Wedding Film'
  | 'Pre-Wedding Film'
  | 'Pre-Wedding Shoot';

export interface ClientTestimonial {
  quote: string;
  narrative: string;
}

export interface ClientPortfolio {
  slug: string;
  coupleNames: string;
  date: string;
  venue: string;
  location: string;
  featuredCover: string;
  coupleAvatar?: string;
  hasPhotoGallery: boolean;
  services: ClientService[];
  eventTags: string[];
  films: FilmDeliverables;
  events: EventGallery[];
  testimonial?: ClientTestimonial;
}

// Utility to generate sequential local image paths
const generatePaths = (clientSlug: string, eventFolder: string, count: number, ext: string = 'webp'): string[] => {
  return Array.from({ length: count }, (_, i) => {
    const num = String(i + 1).padStart(3, '0');
    return `/clients/${clientSlug}/${eventFolder}/${num}.${ext}`;
  });
};

export const clients: ClientPortfolio[] = [
  // ==========================================
  // 1. SIMAR & VASU
  // ==========================================
  {
    slug: 'vasu-simar',
    coupleNames: 'Simar & Vasu',
    date: '2026-02-22',
    venue: 'Zana Luxury Resort',
    location: 'Jim Corbett, Uttarakhand',
    featuredCover: '/clients/vasu-simar/wed/068.webp',
    hasPhotoGallery: true,
    services: ['Photography'],
    eventTags: ['Haldi', 'Mehndi', 'Sangeet', 'Cocktail', 'Wedding'],
    films: {},
    testimonial: {
      quote: 'They captured the raw vulnerability and joy that no staged pose could ever touch.',
      narrative:
        'Looking through our gallery felt like reliving every emotion from Corbett. There was never any forced direction—just pure, unprompted moments between our families preserved with unmatched editorial honesty.',
    },
    events: [
      {
        id: 'eng',
        name: 'Engagement',
        folder: 'eng',
        coverImage: '/clients/vasu-simar/eng/001.webp',
        images: generatePaths('vasu-simar', 'eng', 21),
      },
      {
        id: 'hal',
        name: 'Haldi Ceremony',
        folder: 'hal',
        coverImage: '/clients/vasu-simar/hal/001.webp',
        images: generatePaths('vasu-simar', 'hal', 25),
      },
      {
        id: 'san',
        name: 'Sangeet & Cocktail Night',
        folder: 'san',
        coverImage: '/clients/vasu-simar/san/001.webp',
        images: generatePaths('vasu-simar', 'san', 13),
      },
      {
        id: 'wed',
        name: 'Wedding Ceremony',
        folder: 'wed',
        coverImage: '/clients/vasu-simar/wed/001.webp',
        images: generatePaths('vasu-simar', 'wed', 77),
      },
    ],
  },

  // ==========================================
  // 2. KARAN & BANI
  // ==========================================
  {
    slug: 'karan-bani',
    coupleNames: 'Karan & Bani',
    date: '2025-11-20',
    venue: 'Amarai Farms',
    location: 'Chhatarpur, New Delhi',
    featuredCover: '/clients/karan-bani/wed/052.webp',
    hasPhotoGallery: true,
    services: ['Photography'],
    eventTags: ['Wedding'],
    films: {},
    testimonial: {
      quote: 'Effortless elegance. Every frame could live inside a fine art coffee table book.',
      narrative:
        'We were particular about avoiding cookie-cutter wedding photography. The team moved seamlessly in the background, letting us be ourselves and preserving the true spirit of our wedding night.',
    },
    events: [
      {
        id: 'wed',
        name: 'Wedding Ceremony',
        folder: 'wed',
        coverImage: '/clients/karan-bani/wed/001.webp',
        images: generatePaths('karan-bani', 'wed', 86),
      },
    ],
  },

  // ==========================================
  // 3. RISHABH & AISHWARYA
  // ==========================================
  {
    slug: 'rishabh-aishwarya',
    coupleNames: 'Rishabh & Aishwarya',
    date: '2026-02-05',
    venue: 'The Grand Nirvana',
    location: 'Bareilly, Uttar Pradesh',
    featuredCover: '/clients/rishabh-aishwarya/wed/024.webp',
    hasPhotoGallery: true,
    services: ['Photography', 'Wedding Film'],
    eventTags: ['Engagement', 'Haldi', 'Mehndi', 'Wedding', 'Wedding Full Film', 'Wedding Teaser'],
    films: {
      teaserUrl: 'https://www.youtube.com/watch?v=PSq0BAAcmXY',
      teaserThumbnail: 'https://img.youtube.com/vi/PSq0BAAcmXY/maxresdefault.jpg',
      teaserPriority: 2,      // #1 when on "Wedding Teaser" filter
      teaserAllPriority: 10,   // #1 when on "All" filter

      fullWeddingFilmUrl: 'https://www.youtube.com/watch?v=9MFkLC8Zfj0',
      fullWeddingFilmThumbnail: 'https://img.youtube.com/vi/9MFkLC8Zfj0/maxresdefault.jpg',
      fullWeddingFilmPriority: 1, // #1 when on "Wedding Full Film" filter
      fullWeddingFilmAllPriority: 3, // #4 when on "All" filter
    },
    testimonial: {
      quote: 'Our wedding teaser and full film felt like pure cinema, not a standard montage.',
      narrative:
        'The sensitivity with which they documented our celebrations blew us away. They captured the micro-interactions between our parents and friends that we completely missed in the whirlwind of the day.',
    },
    events: [
      {
        id: 'eng',
        name: 'Engagement',
        folder: 'eng',
        coverImage: '/clients/rishabh-aishwarya/eng/001.webp',
        images: generatePaths('rishabh-aishwarya', 'eng', 11),
      },
      {
        id: 'hal',
        name: 'Haldi & Mehndi Ceremony',
        folder: 'hal',
        coverImage: '/clients/rishabh-aishwarya/hal/001.webp',
        images: generatePaths('rishabh-aishwarya', 'hal', 21),
      },
      {
        id: 'wed',
        name: 'Wedding Ceremony',
        folder: 'wed',
        coverImage: '/clients/rishabh-aishwarya/wed/001.webp',
        images: generatePaths('rishabh-aishwarya', 'wed', 27),
      },
    ],
  },

  // ==========================================
  // 4. MANPREET & SIMRAN
  // ==========================================
  {
    slug: 'manpreet-simran',
    coupleNames: 'Manpreet & Simran',
    date: '2025-12-08',
    venue: 'Zana Luxury Resort',
    location: 'Jim Corbett, Uttarakhand',
    featuredCover: '/clients/manpreet-simran/wed/001.webp',
    hasPhotoGallery: true,
    services: ['Photography'],
    eventTags: ['Wedding'],
    films: {},
    events: [
      {
        id: 'wed',
        name: 'Wedding Ceremony',
        folder: 'wed',
        coverImage: '/clients/manpreet-simran/wed/001.webp',
        images: generatePaths('manpreet-simran', 'wed', 74),
      },
    ],
  },

  // ==========================================
  // 5. NITIN & PARIKA
  // ==========================================
  {
    slug: 'nitin-parika',
    coupleNames: 'Nitin & Parika',
    date: '2026-01-18',
    venue: 'Zana Luxury Resort',
    location: 'Jim Corbett, Uttarakhand',
    featuredCover: '/clients/nitin-parika/wed/001.webp',
    hasPhotoGallery: true,
    services: ['Photography'],
    eventTags: ['Engagement', 'Haldi', 'Wedding'],
    films: {},
    events: [
      {
        id: 'eng',
        name: 'Engagement',
        folder: 'eng',
        coverImage: '/clients/nitin-parika/eng/001.webp',
        images: generatePaths('nitin-parika', 'eng', 5),
      },
      {
        id: 'hal',
        name: 'Haldi Ceremony',
        folder: 'hal',
        coverImage: '/clients/nitin-parika/hal/001.webp',
        images: generatePaths('nitin-parika', 'hal', 37),
      },
      {
        id: 'wed',
        name: 'Wedding Ceremony',
        folder: 'wed',
        coverImage: '/clients/nitin-parika/wed/001.webp',
        images: generatePaths('nitin-parika', 'wed', 56),
      },
    ],
  },

  // ==========================================
  // 6. SHUBHAM & VAANI
  // ==========================================
  {
    slug: 'shubham-vaani',
    coupleNames: 'Shubham & Vaani',
    date: '2025-10-15',
    venue: 'Destination Outdoor',
    location: 'Rishikesh, Uttarakhand',
    featuredCover: 'https://img.youtube.com/vi/vCvLHwNlJsA/maxresdefault.jpg',
    hasPhotoGallery: false,
    services: ['Pre-Wedding Film'],
    eventTags: ['Pre-Wedding Film'],
    films: {
      preWeddingFilmUrl: 'https://www.youtube.com/watch?v=vCvLHwNlJsA',
      preWeddingFilmThumbnail: 'https://img.youtube.com/vi/vCvLHwNlJsA/maxresdefault.jpg',
      preWeddingPriority: 1,      // #1 when on "Pre Wedding" filter
      preWeddingAllPriority: 4,   // #2 when on "All" filter
    },
    events: [],
  },

  // ==========================================
  // 7. SHASHANK & AMRITA
  // ==========================================
  {
    slug: 'shashank-amrita',
    coupleNames: 'Shashank & Amrita',
    date: '2025-11-10',
    venue: 'Ocean Pearl Gardenia',
    location: 'Chhatarpur, New Delhi',
    featuredCover: 'https://img.youtube.com/vi/wq2yRFZ8txc/maxresdefault.jpg',
    hasPhotoGallery: false,
    services: ['Wedding Film'],
    eventTags: ['Engagement', 'Haldi', 'Sangeet', 'Wedding Film'],
    films: {
      teaserUrl: 'https://www.youtube.com/watch?v=wq2yRFZ8txc',
      teaserThumbnail: 'https://img.youtube.com/vi/wq2yRFZ8txc/maxresdefault.jpg',
      teaserPriority: 2,      // #2 when on "Wedding Teaser" filter
      teaserAllPriority: 5,   // #5 when on "All" filter

      weddingFilmUrl: 'https://www.youtube.com/watch?v=tTJQqUYD_R8',
      weddingFilmThumbnail: 'https://img.youtube.com/vi/tTJQqUYD_R8/maxresdefault.jpg',
      weddingFilmPriority: 2,      // #2 when on "Wedding Film" filter
      weddingFilmAllPriority: 6,   // #6 when on "All" filter
    },
    events: [],
  },

  // ==========================================
  // 8. ARJUN & AROHI
  // ==========================================
  {
    slug: 'arjun-arohi',
    coupleNames: 'Arjun & Arohi',
    date: '2025-12-14',
    venue: 'Woodstock Acres Villa Resort',
    location: 'South Goa',
    featuredCover: 'https://img.youtube.com/vi/POq8-q09aFc/maxresdefault.jpg',
    hasPhotoGallery: false,
    services: ['Wedding Film'],
    eventTags: ['Wedding Teaser'],
    films: {
      teaserUrl: 'https://www.youtube.com/watch?v=POq8-q09aFc',
      teaserThumbnail: 'https://img.youtube.com/vi/POq8-q09aFc/maxresdefault.jpg',
      teaserPriority: 1,      // #3 when on "Wedding Teaser" filter
      teaserAllPriority: 1,   // #7 when on "All" filter
    },
    events: [],
  },

  // ==========================================
  // 9. AKSHAY & SAKSHI
  // ==========================================
  {
    slug: 'akshay-sakshi',
    coupleNames: 'Akshay & Sakshi',
    date: '2026-01-10',
    venue: 'Club House',
    location: 'Palampur, Himachal Pradesh',
    featuredCover: 'https://img.youtube.com/vi/ZB9PBwdiwUM/maxresdefault.jpg',
    hasPhotoGallery: false,
    services: ['Pre-Wedding Film'],
    eventTags: ['Pre-Wedding Film', 'Engagement'],
    films: {
      preWeddingFilmUrl: 'https://www.youtube.com/watch?v=ZB9PBwdiwUM',
      preWeddingFilmThumbnail: 'https://img.youtube.com/vi/ZB9PBwdiwUM/maxresdefault.jpg',
      preWeddingPriority: 2,      // #2 when on "Pre Wedding" filter
      preWeddingAllPriority: 8,   // #8 when on "All" filter
    },
    testimonial: {
      quote: 'Not your cliché pre-wedding film. Authentic, purpose-driven, and truly our story.',
      narrative:
        'We wanted something honest rather than slow-motion running through gardens. They built the film around what truly mattered to us, balancing purpose with our relationship in a way we will cherish forever.',
    },
    events: [],
  },

  // ==========================================
  // 10. NITANT & ADITI
  // ==========================================
  {
    slug: 'nitant-aditi',
    coupleNames: 'Nitant & Aditi',
    date: '2026-01-26',
    venue: 'Crowne Plaza',
    location: 'Greater Noida, Uttar Pradesh',
    featuredCover: 'https://img.youtube.com/vi/kHxfIILV9Rw/maxresdefault.jpg',
    hasPhotoGallery: false,
    services: ['Wedding Film'],
    eventTags: ['Wedding Teaser'],
    films: {
      teaserUrl: 'https://www.youtube.com/watch?v=kHxfIILV9Rw',
      teaserThumbnail: 'https://img.youtube.com/vi/kHxfIILV9Rw/maxresdefault.jpg',
      teaserPriority: 4,      // #4 when on "Wedding Teaser" filter
      teaserAllPriority: 9,   // #9 when on "All" filter
    },
    events: [],
  },

  // ==========================================
  // 11. YASH & NISHITA
  // ==========================================
  {
    slug: 'yash-nishita',
    coupleNames: 'Yash & Nishita',
    date: '2026-02-18',
    venue: 'Triyuginarayan Temple',
    location: 'Rudraprayag, Uttarakhand',
    featuredCover: 'https://img.youtube.com/vi/KQ3V3IqcAls/maxresdefault.jpg',
    hasPhotoGallery: false,
    services: ['Wedding Film'],
    eventTags: ['Engagement', 'Haldi', 'Wedding Film'],
    films: {
      weddingFilmUrl: 'https://www.youtube.com/watch?v=KQ3V3IqcAls',
      weddingFilmThumbnail: 'https://img.youtube.com/vi/KQ3V3IqcAls/maxresdefault.jpg',
      weddingFilmPriority: 1,      // #1 when on "Wedding Film" filter
      weddingFilmAllPriority: 2,   // #2 when on "All" filter
    },
    testimonial: {
      quote: 'They captured the sanctity and grandeur of Triyuginarayan with sublime reverence.',
      narrative:
        'Filming an ancient temple wedding at altitude has its own challenges, but the team navigated the sacred rituals with complete respect and produced a film that moves us to tears every single watch.',
    },
    events: [],
  },
];

// Lookup Helpers
export const getClientBySlug = (slug: string): ClientPortfolio | undefined => {
  return clients.find((c) => c.slug === slug);
};

export const getAllClientSlugs = (): string[] => {
  return clients.map((c) => c.slug);
};