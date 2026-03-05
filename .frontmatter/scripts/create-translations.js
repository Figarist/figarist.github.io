#!/usr/bin/env node
/**
 * create-translations.js
 * Frontmatter CMS Custom Action
 *
 * Given the current post file (passed by FM as argv[2]),
 * this script generates stub translation files for all
 * missing languages (uk, ru, ko) with the same slug.
 *
 * FM passes: node create-translations.js <filePath>
 */

const fs = require('fs');
const path = require('path');

const LANGS = ['en', 'uk', 'ru', 'ko'];
const LANG_LABELS = { en: 'English', uk: 'Ukrainian', ru: 'Russian', ko: 'Korean' };

const filePath = process.argv[2];
if (!filePath) {
    console.error('No file path provided by Frontmatter CMS.');
    process.exit(1);
}

// ── Parse the source file ────────────────────────────────────────────────────
const content = fs.readFileSync(filePath, 'utf-8');
const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
if (!fmMatch) {
    console.error('Could not find front matter in file.');
    process.exit(1);
}

const fmBlock = fmMatch[1];
const body = content.slice(fmMatch[0].length).trim();

function getFmValue(block, key) {
    const m = block.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?\\s*$`, 'm'));
    return m ? m[1].trim() : null;
}

const sourceLang = getFmValue(fmBlock, 'lang') || 'en';
const title = getFmValue(fmBlock, 'title') || 'Untitled';
const permalink = getFmValue(fmBlock, 'permalink') || '';
const date = getFmValue(fmBlock, 'date') || '';

// Determine the base name — strip the source lang suffix
const dir = path.dirname(filePath);
const extname = path.extname(filePath);
const basename = path.basename(filePath, extname);

// Strip -en / -uk / -ru / -ko suffix to get the slug base
const slugBase = basename.replace(/-(?:en|uk|ru|ko)$/, '');

const created = [];
const skipped = [];

for (const lang of LANGS) {
    if (lang === sourceLang) continue; // skip source

    const targetFile = path.join(dir, `${slugBase}-${lang}${extname}`);
    if (fs.existsSync(targetFile)) {
        skipped.push(lang);
        continue;
    }

    // Build the stub front matter
    const langPermalink = permalink
        ? (lang === 'en' ? permalink : `/${lang}${permalink}`)
        : '';

    const stubFm = fmBlock
        .replace(/^lang:\s*.+$/m, `lang: ${lang}`)
        .replace(/^permalink:\s*.+$/m, `permalink: ${langPermalink}`)
        .replace(/^title:\s*.+$/m, `title: "[${LANG_LABELS[lang]} translation] ${title}"`);

    const stubContent = `---\n${stubFm}\n---\n\n<!-- TODO: Translate from ${LANG_LABELS[sourceLang]} -->\n\n${body}\n`;
    fs.writeFileSync(targetFile, stubContent, 'utf-8');
    created.push(lang);
}

if (created.length > 0) {
    console.log(`✅ Created stubs for: ${created.join(', ')}`);
}
if (skipped.length > 0) {
    console.log(`⏭ Already exist: ${skipped.join(', ')}`);
}
if (created.length === 0 && skipped.length === 0) {
    console.log('Nothing to do — all translations already exist.');
}
