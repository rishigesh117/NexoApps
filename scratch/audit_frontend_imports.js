const fs = require('fs');
const path = require('path');

function getTsFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => {
    if (d.name === 'node_modules' || d.name === '.next') return [];
    const full = path.join(dir, d.name);
    return d.isDirectory() ? getTsFiles(full) : full;
  }).filter((f) => f.endsWith('.ts') || f.endsWith('.tsx'));
}

const files = getTsFiles('frontend');
let missingImports = 0;

files.forEach((file) => {
  const content = fs.readFileSync(file, 'utf8');
  const matches = content.matchAll(/from\s+['"](\..*?)['"]/g);
  for (const m of matches) {
    const imp = m[1];
    const res = path.resolve(path.dirname(file), imp);
    const exists =
      fs.existsSync(res) ||
      fs.existsSync(res + '.ts') ||
      fs.existsSync(res + '.tsx') ||
      fs.existsSync(res + '.js') ||
      fs.existsSync(path.join(res, 'index.ts')) ||
      fs.existsSync(path.join(res, 'index.tsx'));
    if (!exists) {
      console.error('Broken import in', file, ':', imp);
      missingImports++;
    }
  }
});

console.log('Total Frontend Source Files Checked:', files.length);
console.log('Broken Imports Found:', missingImports);
