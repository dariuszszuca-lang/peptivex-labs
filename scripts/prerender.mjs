import puppeteer from 'puppeteer';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, '..', 'dist');
const PORT = 4173;

const productSlugs = [
  'retatrutide-40mg', 'retatrutide-20mg', 'bpc-157-5mg', 'bpc-157-10mg',
  'tb-500-5mg', 'nad-100mg', 'nad-500mg', 'ghk-cu-50mg', 'ghk-cu-100mg',
  'mots-c-10mg', 'ss-31-10mg', 'cjc-1295-no-dac-5mg', 'melanotan-2-10mg',
  '5-amino-1mq-10mg', 'ipamorelin-5mg', 'ipamorelin-10mg',
  'selank-5mg', 'selank-10mg', 'snap-8-10mg',
];
const blogSlugs = ['what-are-peptides', 'bpc-157-research-overview', 'peptide-storage-guide'];
const staticPages = ['', '/products', '/about', '/faq', '/contact', '/blog', '/terms', '/privacy', '/legal', '/cart'];

const routes = [
  '/',
  ...staticPages.flatMap(p => [`/pl${p}`, `/en${p}`]),
  ...productSlugs.flatMap(s => [`/pl/product/${s}`, `/en/product/${s}`]),
  ...blogSlugs.flatMap(s => [`/pl/blog/${s}`, `/en/blog/${s}`]),
];

// Simple static file server
function startServer() {
  const mime = { '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };
  return new Promise(resolve => {
    const server = createServer((req, res) => {
      let filePath = join(DIST, req.url === '/' ? '/index.html' : req.url);
      const ext = filePath.match(/\.\w+$/)?.[0];
      if (!ext || !existsSync(filePath)) filePath = join(DIST, 'index.html');
      try {
        const content = readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': mime[ext] || 'text/html' });
        res.end(content);
      } catch {
        res.writeHead(404);
        res.end('Not found');
      }
    });
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log(`\n🔄 Pre-rendering ${routes.length} routes...\n`);
  const server = await startServer();
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();

  let done = 0;
  for (const route of routes) {
    try {
      await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 15000 });
      // Wait for React to render
      await page.waitForSelector('#root > *', { timeout: 5000 });

      const html = await page.content();

      // Write to dist/[route]/index.html
      const outDir = join(DIST, route === '/' ? '' : route);
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, 'index.html'), html);
      done++;
      if (done % 10 === 0 || done === routes.length) {
        console.log(`  ✅ ${done}/${routes.length} routes rendered`);
      }
    } catch (err) {
      console.log(`  ❌ ${route}: ${err.message}`);
    }
  }

  await browser.close();
  server.close();
  console.log(`\n✅ Pre-rendered ${done}/${routes.length} routes to dist/\n`);
}

prerender();
