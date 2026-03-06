#!/usr/bin/env node
/**
 * create-translations.js
 * Front Matter CMS Custom Action
 *
 * Given the current post file (passed by FM as argv[2]),
 * generates stub translation files for all missing languages
 * with auto-generated permalinks from the filename slug.
 *
 * Permalink rules (jekyll-polyglot, default_lang: en):
 *   EN → /blog/slug/            (no prefix)
 *   UK → /uk/blog/slug/
 *   RU → /ru/blog/slug/
 *   KO → /ko/blog/slug/
 *
 * FM passes: node create-translations.js <filePath>
 */

const fs = require('fs');
const path = require('path');

// ── Config ───────────────────────────────────────────────────────────────────
const DEFAULT_LANG = 'en';
const LANGS = ['en', 'uk', 'ru', 'ko'];
const LANG_LABELS = { en: 'English', uk: 'Ukrainian', ru: 'Russian', ko: 'Korean' };
const LANG_SUFFIXES_RE = new RegExp(`-(${LANGS.join('|')})$`);

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

const sourceLang = getFmValue(fmBlock, 'lang') || DEFAULT_LANG;
const title = getFmValue(fmBlock, 'title') || 'Untitled';

// ── Extract slug from filename ───────────────────────────────────────────────
const dir = path.dirname(filePath);
const extname = path.extname(filePath);
const basename = path.basename(filePath, extname);

// Strip date prefix and lang suffix to get the pure slug
const slugBase = basename.replace(/^\d{4}-\d{2}-\d{2}-/, '');
const slug = slugBase.replace(LANG_SUFFIXES_RE, '');

// ── Determine content type for permalink generation ──────────────────────────
const contentType = (getFmValue(fmBlock, 'fmContentType') || getFmValue(fmBlock, 'layout') || 'post').toLowerCase();
const basePath = TYPE_TO_PATH[contentType] || '/blog';

// ── Generate permalink for a given language ──────────────────────────────────
function makePermalink(lang) {
    if (lang === DEFAULT_LANG) {
        return `${basePath}/${slug}/`;
    }
    return `/${lang}${basePath}/${slug}/`;
}

// ── Also fix source file permalink if empty ──────────────────────────────────
const sourcePermalink = getFmValue(fmBlock, 'permalink');
if (!sourcePermalink) {
    const newPermalink = makePermalink(sourceLang);
    let updatedContent;
    if (/^permalink:\s*["']?["']?\s*$/m.test(fmBlock)) {
        updatedContent = content.replace(
            /^permalink:\s*["']?["']?\s*$/m,
            `permalink: "${newPermalink}"`
        );
    } else if (/^permalink:/m.test(fmBlock)) {
        updatedContent = content.replace(
            /^permalink:\s*.+$/m,
            `permalink: "${newPermalink}"`
        );
    } else {
        updatedContent = content.replace(
            /^(lang:\s*.+)$/m,
            `$1\npermalink: "${newPermalink}"`
        );
    }
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`📌 Source permalink set: ${newPermalink}`);
}

// ── Create translation stubs ─────────────────────────────────────────────────
const created = [];
const skipped = [];

for (const lang of LANGS) {
    if (lang === sourceLang) continue;

    // Target filename: same date prefix + slug + lang suffix
    const datePrefix = basename.match(/^\d{4}-\d{2}-\d{2}-/)?.[0] || '';
    const targetFile = path.join(dir, `${datePrefix}${slug}-${lang}${extname}`);

    if (fs.existsSync(targetFile)) {
        skipped.push(lang);
        continue;
    }

    const langPermalink = makePermalink(lang);

    // Build stub front matter by replacing lang, permalink, title
    let stubFm = fmBlock
        .replace(/^lang:\s*.+$/m, `lang: ${lang}`)
        .replace(/^title:\s*.+$/m, `title: "[${LANG_LABELS[lang]}] ${title}"`);

    // Handle permalink replacement
    if (/^permalink:\s*/m.test(stubFm)) {
        stubFm = stubFm.replace(/^permalink:\s*.+$/m, `permalink: "${langPermalink}"`);
    } else {
        stubFm = stubFm.replace(
            /^(lang:\s*.+)$/m,
            `$1\npermalink: "${langPermalink}"`
        );
    }

    const stubContent = `---\n${stubFm}\n---\n\n<!-- TODO: Translate from ${LANG_LABELS[sourceLang]} -->\n\n${body}\n`;
    fs.writeFileSync(targetFile, stubContent, 'utf-8');
    created.push(`${lang} (${langPermalink})`);
}

// ── Report ───────────────────────────────────────────────────────────────────
if (created.length > 0) {
    console.log(`✅ Created: ${created.join(', ')}`);
}
if (skipped.length > 0) {
    console.log(`⏭ Already exist: ${skipped.join(', ')}`);
}
if (created.length === 0 && skipped.length === 0) {
    console.log('Nothing to do — all translations already exist.');
}
