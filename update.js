const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf-8');
      const original = content;

      // Text colors
      content = content.replace(/text-white/g, 'text-gray-900 dark:text-white');
      content = content.replace(/text-gray-400/g, 'text-gray-500 dark:text-gray-400');
      content = content.replace(/text-gray-300/g, 'text-gray-600 dark:text-gray-300');
      
      // Backgrounds
      content = content.replace(/bg-white\/5/g, 'bg-black/5 dark:bg-white/5');
      content = content.replace(/bg-white\/10/g, 'bg-black/10 dark:bg-white/10');
      content = content.replace(/bg-gray-900\/95/g, 'bg-white/95 dark:bg-gray-900/95');
      content = content.replace(/bg-gray-900/g, 'bg-white dark:bg-gray-900');
      content = content.replace(/hover:bg-white\/5/g, 'hover:bg-black/5 dark:hover:bg-white/5');
      content = content.replace(/hover:bg-white\/10/g, 'hover:bg-black/10 dark:hover:bg-white/10');
      
      // Borders
      content = content.replace(/border-white\/10/g, 'border-black/10 dark:border-white/10');
      content = content.replace(/border-white\/5/g, 'border-black/5 dark:border-white/5');

      // specific fixes for charts, shadows
      content = content.replace(/bg-indigo-500\/20/g, 'bg-indigo-500/10 dark:bg-indigo-500/20');
      content = content.replace(/text-indigo-400/g, 'text-indigo-600 dark:text-indigo-400');
      content = content.replace(/text-emerald-400/g, 'text-emerald-600 dark:text-emerald-400');
      content = content.replace(/text-amber-400/g, 'text-amber-600 dark:text-amber-400');
      content = content.replace(/text-red-400/g, 'text-red-600 dark:text-red-400');
      content = content.replace(/text-pink-400/g, 'text-pink-600 dark:text-pink-400');

      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf-8');
        console.log('Updated: ' + fullPath);
      }
    }
  }
}

processDir(path.resolve(__dirname, 'src/app'));
