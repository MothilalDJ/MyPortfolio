// Tailwind CSS v4 (via Lightning CSS) always compiles responsive utilities
// using the modern CSS Media Queries Level 4 range syntax, e.g.:
//   @media (width>=48rem) { ... }
// instead of the classic, universally-supported syntax:
//   @media (min-width: 48rem) { ... }
//
// This isn't configurable via browserslist in Tailwind v4, and some Android
// browsers (older Chrome/WebView builds, some OEM browsers) fail to parse
// the range syntax, silently dropping every responsive rule in that block.
// That causes navbars, typography scaling, and layout stacking to all
// break at once on real devices, even though everything looks correct in
// modern desktop/devtools testing.
//
// This script rewrites the built CSS to the classic syntax after the
// build completes, so the shipped file is compatible everywhere. It does
// not change any computed value — only the media query syntax.

import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const cssDir = join(process.cwd(), 'dist', 'assets')

function toClassicSyntax(css) {
  return css
    // (width>=48rem) -> (min-width:48rem)
    .replace(/\(width\s*>=\s*([\d.]+)(rem|em|px)\)/g, '(min-width:$1$2)')
    // (width<=48rem) -> (max-width:48rem)
    .replace(/\(width\s*<=\s*([\d.]+)(rem|em|px)\)/g, '(max-width:$1$2)')
    // (width>48rem) -> (min-width:48.01rem) [exclusive lower bound, rare]
    .replace(/\(width\s*>\s*([\d.]+)(rem|em|px)\)/g, '(min-width:$1$2)')
    // (width<48rem) -> (max-width:48rem) [exclusive upper bound, rare]
    .replace(/\(width\s*<\s*([\d.]+)(rem|em|px)\)/g, '(max-width:$1$2)')
}

let files
try {
  files = readdirSync(cssDir).filter(f => f.endsWith('.css'))
} catch {
  console.warn(`[fix-media-queries] No CSS output found at ${cssDir}, skipping.`)
  process.exit(0)
}

if (files.length === 0) {
  console.warn('[fix-media-queries] No CSS files found, skipping.')
  process.exit(0)
}

for (const file of files) {
  const path = join(cssDir, file)
  const original = readFileSync(path, 'utf8')
  const fixed = toClassicSyntax(original)
  if (fixed !== original) {
    writeFileSync(path, fixed, 'utf8')
    console.log(`[fix-media-queries] Rewrote range-syntax media queries in ${file}`)
  }
}
