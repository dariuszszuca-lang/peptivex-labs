import { readFileSync, writeFileSync, globSync } from 'fs';

const MAP = [
  ['Retatrutide 40mg', '/images/products/retatrutide-box-front.jpg', '/images/products/retatrutide-40mg.jpg'],
  ['BPC-157 10mg', '/images/products/bpc-157-vial.png', '/images/products/bpc-157-10mg.jpg'],
  ['TB-500 5mg', '/images/products/bpc-157-vial.png', '/images/products/tb-500-5mg.jpg'],
  ['NAD+ 500mg', '/images/products/bpc-157-vial.png', '/images/products/nad-500mg.jpg'],
  ['GHK-Cu 50mg', '/images/products/bpc-157-vial.png', '/images/products/ghk-cu-50mg.jpg'],
  ['GHK-Cu 100mg', '/images/products/bpc-157-vial.png', '/images/products/ghk-cu-100mg.jpg'],
  ['MOTS-c 10mg', '/images/products/bpc-157-vial.png', '/images/products/mots-c-10mg.jpg'],
  ['CJC-1295 No DAC 5mg', '/images/products/bpc-157-vial.png', '/images/products/cjc-1295-5mg.jpg'],
  ['5-Amino-1MQ 10mg', '/images/products/bpc-157-vial.png', '/images/products/5-amino-1mq-10mg.jpg'],
  ['Ipamorelin 5mg', '/images/products/bpc-157-vial.png', '/images/products/ipamorelin-5mg.jpg'],
];

const esc = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const files = globSync('dist/**/*.html');
let totalUpdated = 0;
let totalReplacements = 0;

for (const file of files) {
  let text = readFileSync(file, 'utf8');
  const before = text;
  let fileReplacements = 0;

  for (const [alt, oldPath, newPath] of MAP) {
    // Match <img ...alt="NAME"...src="OLD_PATH"...> and swap src. Also handles src before alt.
    const patA = new RegExp(`(<img[^>]*\\balt="${esc(alt)}"[^>]*\\bsrc=")${esc(oldPath)}(")`, 'g');
    const patB = new RegExp(`(<img[^>]*\\bsrc=")${esc(oldPath)}("[^>]*\\balt="${esc(alt)}")`, 'g');
    const r1 = text.match(patA)?.length || 0;
    const r2 = text.match(patB)?.length || 0;
    text = text.replace(patA, `$1${newPath}$2`);
    text = text.replace(patB, `$1${newPath}$2`);
    fileReplacements += r1 + r2;
  }

  if (text !== before) {
    writeFileSync(file, text);
    totalUpdated++;
    totalReplacements += fileReplacements;
    console.log(`${fileReplacements} swaps -> ${file}`);
  }
}

console.log(`\nFiles updated: ${totalUpdated}`);
console.log(`Total swaps: ${totalReplacements}`);
