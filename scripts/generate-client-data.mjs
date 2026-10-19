// scripts/generate-client-data.mjs
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Path to your public folder
const PUBLIC_DIR = path.join(process.cwd(), 'public');

// List of your client folder names and their events
const clientsConfig = [
  {
    slug: 'vasu-simar',
    events: [
      { id: 'eng', name: 'Engagement', folder: 'eng', count: 21 },
      { id: 'hal', name: 'Haldi Ceremony', folder: 'hal', count: 25 },
      { id: 'san', name: 'Sangeet & Cocktail Night', folder: 'san', count: 13 },
      { id: 'wed', name: 'Wedding Ceremony', folder: 'wed', count: 77 },
    ],
  },
  {
    slug: 'karan-bani',
    events: [
      { id: 'wed', name: 'Wedding Ceremony', folder: 'wed', count: 86 },
    ],
  },
  {
    slug: 'rishabh-aishwarya',
    events: [
      { id: 'eng', name: 'Engagement', folder: 'eng', count: 11 },
      { id: 'hal', name: 'Haldi & Mehndi Ceremony', folder: 'hal', count: 21 },
      { id: 'wed', name: 'Wedding Ceremony', folder: 'wed', count: 27 },
    ],
  },
  {
    slug: 'manpreet-simran',
    events: [
      { id: 'wed', name: 'Wedding Ceremony', folder: 'wed', count: 74 },
    ],
  },
  {
    slug: 'nitin-parika',
    events: [
      { id: 'eng', name: 'Engagement', folder: 'eng', count: 5 },
      { id: 'hal', name: 'Haldi Ceremony', folder: 'hal', count: 37 },
      { id: 'wed', name: 'Wedding Ceremony', folder: 'wed', count: 56 },
    ],
  },
];

async function generateData() {
  console.log('Scanning image dimensions and orientations...\n');

  const processedClients = [];

  for (const client of clientsConfig) {
    console.log(`Processing: ${client.slug}`);
    const processedEvents = [];

    for (const event of client.events) {
      const folderPath = path.join(PUBLIC_DIR, 'clients', client.slug, event.folder);
      const imagesList = [];
      const imageDataList = [];

      let horizontal = 0;
      let vertical = 0;
      let square = 0;

      for (let i = 1; i <= event.count; i++) {
        const num = String(i).padStart(3, '0');
        const filename = `${num}.webp`;
        const relativeSrc = `/clients/${client.slug}/${event.folder}/${filename}`;
        const filePath = path.join(folderPath, filename);

        imagesList.push(relativeSrc);

        if (fs.existsSync(filePath)) {
          try {
            const meta = await sharp(filePath).metadata();
            const w = meta.width || 0;
            const h = meta.height || 0;

            let orientation = 'horizontal';
            if (h > w) {
              orientation = 'vertical';
              vertical++;
            } else if (w === h) {
              orientation = 'square';
              square++;
            } else {
              horizontal++;
            }

            imageDataList.push({
              src: relativeSrc,
              width: w,
              height: h,
              aspectRatio: Number((w / h).toFixed(4)),
              orientation,
            });
          } catch (err) {
            console.error(`  [!] Error reading ${filePath}:`, err.message);
          }
        } else {
          console.warn(`  [?] File missing: ${filePath}`);
        }
      }

      processedEvents.push({
        id: event.id,
        name: event.name,
        folder: event.folder,
        coverImage: `/clients/${client.slug}/${event.folder}/001.webp`,
        images: imagesList,
        imageData: imageDataList,
        stats: {
          total: imagesList.length,
          horizontal,
          vertical,
          square,
        },
      });

      console.log(
        `  -> ${event.name}: ${imagesList.length} total (${horizontal} horizontal, ${vertical} vertical, ${square} square)`
      );
    }

    processedClients.push({
      slug: client.slug,
      events: processedEvents,
    });
  }

  // Save the output to a JSON file ready to import
  const outputPath = path.join(process.cwd(), 'data/client-events-generated.json');
  fs.writeFileSync(outputPath, JSON.stringify(processedClients, null, 2));

  console.log(`\nSuccessfully exported metadata to: ${outputPath}`);
}

generateData();