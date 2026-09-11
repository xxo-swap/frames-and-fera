// scripts/batch-sync-portfolio.js
import fs from 'fs';
import path from 'path';

const CLIENTS_ROOT = path.resolve(process.cwd(), 'public/clients');
const OUTPUT_JSON_PATH = path.resolve(process.cwd(), 'data/clients-data.json');
const VALID_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

// Human-readable titles for common folder names
const EVENT_NAME_MAP = {
  wed: 'Wedding Ceremony',
  wedding: 'Wedding Ceremony',
  haldi: 'Haldi & Chooda',
  sangeet: 'Sangeet Night',
  mehendi: 'Mehendi',
  reception: 'Reception',
  engagement: 'Engagement',
  prewed: 'Pre-Wedding',
};

function processFolder(eventFolderPath, clientSlug, eventFolder) {
  // 1. Gather all valid image files
  const files = fs
    .readdirSync(eventFolderPath)
    .filter((file) => {
      const fullPath = path.join(eventFolderPath, file);
      return fs.statSync(fullPath).isFile() && VALID_EXTENSIONS.has(path.extname(file).toLowerCase());
    })
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

  if (files.length === 0) return [];

  const padLength = Math.max(3, String(files.length).length);

  // 2. Pass 1: Rename to temporary names to avoid collision
  const tempFiles = files.map((file, idx) => {
    const ext = path.extname(file).toLowerCase();
    const oldPath = path.join(eventFolderPath, file);
    const tempName = `__temp_${Date.now()}_${idx}${ext}`;
    const tempPath = path.join(eventFolderPath, tempName);
    fs.renameSync(oldPath, tempPath);
    return { tempPath, ext };
  });

  // 3. Pass 2: Rename from temp to sequential 001.ext, 002.ext
  const finalImagePaths = [];
  tempFiles.forEach((item, idx) => {
    const sequenceNumber = String(idx + 1).padStart(padLength, '0');
    const finalFileName = `${sequenceNumber}${item.ext}`;
    const finalPath = path.join(eventFolderPath, finalFileName);

    fs.renameSync(item.tempPath, finalPath);
    finalImagePaths.push(`/clients/${clientSlug}/${eventFolder}/${finalFileName}`);
  });

  console.log(`  ✓ ${eventFolder}: Renamed and indexed ${finalImagePaths.length} photos`);
  return finalImagePaths;
}

function run() {
  if (!fs.existsSync(CLIENTS_ROOT)) {
    console.error(`Directory not found: ${CLIENTS_ROOT}`);
    process.exit(1);
  }

  // Load existing metadata (like coupleNames, films, locations) if file already exists
  let existingData = {};
  if (fs.existsSync(OUTPUT_JSON_PATH)) {
    try {
      const raw = fs.readFileSync(OUTPUT_JSON_PATH, 'utf-8');
      const parsed = JSON.parse(raw);
      parsed.forEach((c) => {
        existingData[c.slug] = c;
      });
    } catch (e) {
      console.warn('Existing clients-data.json could not be parsed. Creating fresh.');
    }
  }

  const clientDirectories = fs
    .readdirSync(CLIENTS_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const clientsOutput = [];

  for (const clientSlug of clientDirectories) {
    console.log(`\nProcessing client: ${clientSlug}`);
    const clientPath = path.join(CLIENTS_ROOT, clientSlug);

    const eventDirectories = fs
      .readdirSync(clientPath, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name);

    const events = [];

    for (const eventFolder of eventDirectories) {
      const eventFolderPath = path.join(clientPath, eventFolder);
      const images = processFolder(eventFolderPath, clientSlug, eventFolder);

      if (images.length > 0) {
        events.push({
          id: eventFolder,
          name: EVENT_NAME_MAP[eventFolder.toLowerCase()] || eventFolder.toUpperCase(),
          folder: eventFolder,
          coverImage: images[0],
          images,
        });
      }
    }

    const previousClient = existingData[clientSlug] || {};

    // Format readable couple name from slug if missing (e.g. simar-vasu -> Simar & Vasu)
    const fallbackName = clientSlug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' & ');

    clientsOutput.push({
      slug: clientSlug,
      coupleNames: previousClient.coupleNames || fallbackName,
      date: previousClient.date || new Date().toISOString().split('T')[0],
      location: previousClient.location || '',
      featuredCover: previousClient.featuredCover || events[0]?.coverImage || '',
      films: previousClient.films || {
        reelUrl: '',
        teaserUrl: '',
        highlightUrl: '',
        fullWeddingFilmUrl: '',
      },
      events,
    });
  }

  // Ensure data folder exists
  const dataDir = path.dirname(OUTPUT_JSON_PATH);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_JSON_PATH, JSON.stringify(clientsOutput, null, 2));
  console.log(`\n🎉 Done! Synchronized portfolio database saved to: data/clients-data.json`);
}

run();