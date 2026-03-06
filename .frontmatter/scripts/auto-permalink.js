#!/usr/bin/env node
/**
 * auto-permalink.js
 * Front Matter CMS Custom Action
 *
 * Generates a permalink from the markdown filename.
 * 
 * Example:
 *   File: 2026-03-06-how-to-make-game.md
 *   ContentType: Post,  lang: uk  → /uk/blog/how-to-make-game/
 *   ContentType: Post,  lang: en  → /blog/how-to-make-game/
 *   ContentType: Education, lang: ko → /ko/education/how-to-make-game/
 *
 * Permalink rules (jekyll-polyglot):
 *   EN (default_lang) → no prefix:  /blog/slug/
 *   UK, RU, KO       → prefix:     /{lang}/blog/slug/
 *
 * FM passes: node auto-permalink.js <filePath>
 */

const fs = require('fs');
const path = require('path');

// ── Config ───────────────────────────────────────────────────────────────────
const DEFAULT_LANG = 'en';
const LANG_SUFFIXES = ['en', 'uk', 'ru', 'ko'];

// Map contentType / layout → URL base path
const TYPE_TO_PATH = {
  post: '/blog',
  education: '/education'
};

// ── Input ────────────────────────────────────────────────────────────────────
const filePath = process.argv[2];
if (!filePath) {
  console.error('No file path provided by Front Matter CMS.');
  process.exit(1);
}

// ── Read & parse front matter ────────────────────────────────────────────────
const content = fs.readFileSync(filePath, 'utf-8');
const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) {
  console.error('Could not find front matter in file.');
  process.exit(1);
}

const fmBlock = fmMatch[1];

function getFmValue(block, key) {
  const m = block.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'));
  return m ? m[1].trim() : null;
}

// ── Extract slug from filename ───────────────────────────────────────────────
const extname = path.extname(filePath);
const basename = path.basename(filePath, extname);

// Strip date prefix (YYYY-MM-DD-) and lang suffix (-en/-uk/-ru/-ko)
const slugRaw = basename
  .replace(/^\d{4}-\d{2}-\d{2}-/, '')               // remove date prefix
  .replace(new RegExp(`-(${LANG_SUFFIXES.join('|')})$`), ''); // remove lang suffix

if (!slugRaw) {
  console.error('Could not extract slug from filename: ' + basename);
  process.exit(1);
}

// ── Determine content type ───────────────────────────────────────────────────
const contentType = (getFmValue(fmBlock, 'fmContentType') || getFmValue(fmBlock, 'layout') || 'post').toLowerCase();
const basePath = TYPE_TO_PATH[contentType] || '/blog';

// ── Determine language ───────────────────────────────────────────────────────
const lang = getFmValue(fmBlock, 'lang') || DEFAULT_LANG;

// ── Build permalink ──────────────────────────────────────────────────────────
let permalink;
if (lang === DEFAULT_LANG) {
  permalink = `${basePath}/${slugRaw}/`;
} else {
  permalink = `/${lang}${basePath}/${slugRaw}/`;
}

// ── Write back to file ──────────────────────────────────────────────────────
const existingPermalink = getFmValue(fmBlock, 'permalink');

let newContent;
if (existingPermalink) {
  // Replace existing permalink
  newContent = content.replace(
    /^permalink:\s*.+$/m,
    `permalink: "${permalink}"`
  );
} else if (/^permalink:\s*["']?["']?\s*$/m.test(fmBlock)) {
  // Empty permalink field — fill it in
  newContent = content.replace(
    /^permalink:\s*["']?["']?\s*$/m,
    `permalink: "${permalink}"`
  );
} else {
  // No permalink field at all — add after lang
  newContent = content.replace(
    /^(lang:\s*.+)$/m,
    `$1\npermalink: "${permalink}"`
  );
}

fs.writeFileSync(filePath, newContent, 'utf-8');
console.log(`✅ Permalink set: ${permalink}`);
