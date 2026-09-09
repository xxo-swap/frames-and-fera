export interface EventGallery {
  id: string;
  name: string;
  folder: string;
  coverImage: string;
  images: string[];
}

export interface FilmDeliverables {
  reelUrl?: string;
  teaserUrl?: string;
  highlightUrl?: string;
  preWeddingFilmUrl?: string;
  fullWeddingFilmUrl?: string;
}

export interface ClientPortfolio {
  slug: string;
  coupleNames: string;
  date: string;
  venue: string;
  location: string;
  featuredCover: string;
  hasPhotoGallery: boolean;
  eventTags: string[];
  films: FilmDeliverables;
  events: EventGallery[];
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
    featuredCover: '/clients/vasu-simar/wed/001.webp',
    hasPhotoGallery: true,
    eventTags: ['Haldi', 'Mehndi', 'Sangeet', 'Cocktail', 'Wedding'],
    films: {},
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
    featuredCover: '/clients/karan-bani/wed/001.webp',
    hasPhotoGallery: true,
    eventTags: ['Wedding'],
    films: {},
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
    featuredCover: '/clients/rishabh-aishwarya/wed/001.webp',
    hasPhotoGallery: true,
    eventTags: ['Engagement', 'Haldi', 'Mehndi', 'Wedding'],
    films: {},
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
    eventTags: ['Pre-Wedding Film'],
    films: {
      preWeddingFilmUrl: 'https://www.youtube.com/watch?v=vCvLHwNlJsA',
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
    eventTags: ['Engagement', 'Haldi', 'Sangeet', 'Wedding Film'],
    films: {
      teaserUrl: 'https://www.youtube.com/watch?v=wq2yRFZ8txc',
      fullWeddingFilmUrl: 'https://www.youtube.com/watch?v=tTJQqUYD_R8',
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
    eventTags: ['Wedding Teaser'],
    films: {
      teaserUrl: 'https://www.youtube.com/watch?v=POq8-q09aFc',
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
    eventTags: ['Pre-Wedding Film', 'Engagement'],
    films: {
      preWeddingFilmUrl: 'https://www.youtube.com/watch?v=ZB9PBwdiwUM',
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
    eventTags: ['Wedding Teaser'],
    films: {
      teaserUrl: 'https://www.youtube.com/watch?v=kHxfIILV9Rw',
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
    eventTags: ['Engagement', 'Haldi', 'Wedding Film'],
    films: {
      fullWeddingFilmUrl: 'https://www.youtube.com/watch?v=KQ3V3IqcAls',
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