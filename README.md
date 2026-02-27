# figarist.github.io

<div align="center">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&size=32&duration=3000&pause=1000&color=C77DFF&center=true&vCenter=true&width=800&lines=figarist.github.io+%F0%9F%8E%AE;Indie+Game+Developer+%F0%9F%95%B9%EF%B8%8F;Founder+of+Wrist+%26+Pocket+Studio+%E2%9C%A8;Computer+Science+Teacher+%F0%9F%93%9A" alt="Typing SVG" />
</div>

<br/>

<div align="center">
  
  [![Website](https://img.shields.io/badge/Website-figarist.github.io-C77DFF?style=for-the-badge&logo=github&logoColor=white)](https://figarist.github.io)
  [![Studio](https://img.shields.io/badge/Studio-Wrist_%26_Pocket-000000?style=for-the-badge&logo=unity&logoColor=white)](https://wristandpocket.github.io)
  [![Location](https://img.shields.io/badge/Location-Zmiiv,_Ukraine-0052B4?style=for-the-badge&logo=googlemaps&logoColor=white)](https://www.google.com/maps/place/Zmiiv)
  
</div>

<br/>

## 🌌 𝙿𝚘𝚛𝚝𝚏𝚘𝚕𝚒𝚘 𝙾𝚟𝚎𝚛𝚟𝚒𝚎𝚠

```typescript
const portfolio = {
    owner: "Ihor (Figarist)",
    role: "Indie Game Developer & CS Teacher",
    location: "Zmiiv, Ukraine UA",
    studio: "Wrist & Pocket Studio",
    
    stack: {
        frontend: "Jekyll + Pure HTML5 + CSS3 + Vanilla JS",
        architecture: "Bento Grid UI",
        hosting: "GitHub Pages"
    }
};
```

<br/>

## 🛠️ 𝚃𝚎𝚌𝚑 𝚂𝚝𝚊𝚌𝚔 & 𝙰𝚛𝚌𝚑𝚒𝚝𝚎𝚌𝚝𝚞𝚛𝚎

<div align="center">

| Core Tech | Description |
| :---: | :--- |
| ![](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) | Pure HTML5, zero frameworks |
| ![](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white) | Vanilla CSS3, Grid layouts |
| ![](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black) | Vanilla JS, WebGL embedding |
| ![](https://img.shields.io/badge/Jekyll-CC0000?style=flat-square&logo=jekyll&logoColor=white) | Static Site Generation (DRY Includes) |
| ![](https://img.shields.io/badge/GitHub_Pages-222222?style=flat-square&logo=githubpages&logoColor=white) | Deploys via **GitHub Actions** (required for `jekyll-polyglot`) |

</div>

<br/>

## 📁 𝙵𝚒𝚕𝚎 𝚂𝚝𝚛𝚞𝚌𝚝𝚞𝚛𝚎

```text
├── .github/workflows/  # GitHub Actions (Jekyll builds for jekyll-polyglot)
├── index.html          # Bento UI Hub (Polyglot builds both EN and UK from this)
├── _includes/          # DRY Jekyll includes (head, nav, footer)
├── _layouts/           # Jekyll layouts for posts and pages
├── _posts/             # Markdown blog posts
├── styles.css          # Shared global styles + Bento layout
├── script.js           # Shared scripting
├── sitemap.xml         # SEO Hreflang alternates
└── robots.txt          # SEO Crawl rules
```

<br/>

## 🎨 𝙳𝚎𝚜𝚒𝚐𝚗 𝚂𝚢𝚜𝚝𝚎𝚖 — "𝙱𝚎𝚗𝚝𝚘 𝚄𝙸 & 𝙲𝚕𝚘𝚞𝚍 𝙳𝚊𝚗𝚌𝚎𝚛"

<div align="center">

| Token | Details | Hex |
| :---: | :---: | :---: |
| **Background** | Cloud Dancer Page Bg | ![](https://img.shields.io/badge/%23f2f0eb-f2f0eb?style=flat-square) |
| **Surface** | Pure White Cards | ![](https://img.shields.io/badge/%23ffffff-ffffff?style=flat-square) |
| **Accents** | Cool Blue / Deep Blue | ![](https://img.shields.io/badge/%23a2c2e1-a2c2e1?style=flat-square)&nbsp;![](https://img.shields.io/badge/%236e9fc7-6e9fc7?style=flat-square) |
| **Accents** | Blush Pink / Deep Rose | ![](https://img.shields.io/badge/%23f5c2cc-f5c2cc?style=flat-square)&nbsp;![](https://img.shields.io/badge/%23d97f93-d97f93?style=flat-square) |
| **Text** | Dark Text / Muted | ![](https://img.shields.io/badge/%231a1a2e-1a1a2e?style=flat-square)&nbsp;![](https://img.shields.io/badge/%238888a8-8888a8?style=flat-square) |

</div>

> [!NOTE]
> **Architectural rules:** Layout MUST use `display: grid` with explicit `grid-template-areas`. 
> Fractional span classes (`.span-X-X`) and `grid-auto-flow: dense` are FORBIDDEN stringently.

<br/>

## 🌍 𝙱𝚒𝚕𝚒𝚗𝚐𝚞𝚊𝚕 𝙰𝚛𝚌𝚑𝚒𝚝𝚎𝚌𝚝𝚞𝚛𝚎

<div align="center">

![](https://img.shields.io/badge/EN-English-00247D?style=for-the-badge)&nbsp;
![](https://img.shields.io/badge/UK-Ukrainian-FFD700?style=for-the-badge&logoColor=black)&nbsp;
![](https://img.shields.io/badge/RU-Russian-DDDDDD?style=for-the-badge&logoColor=black)&nbsp;
![](https://img.shields.io/badge/KO-Korean-CD2E3A?style=for-the-badge&logoColor=white)

</div>

- **Multi-Language Hubs:** `index.html` is compiled dynamically. `jekyll-polyglot` automatically splits the single root HTML file into a fallback English root (`/`) and localized subdirectories (`/uk/`, `/ru/`, `/ko/`).
- **DRY Translation:** `index.html` and Jekyll Includes (`_includes/`) rely on centralized YAML dictionaries (`_data/[lang]/strings.yml`) to render localized strings natively during the build phase (`{{ site.data[site.active_lang].strings.key }}`). No JS flickering and no massive bloated HTML files.
- **Blog Architecture:** Blog posts use `_layouts/post.html`. You manage posts by duplicating the markdown files natively (`post-en.md`, `post-uk.md`, `post-ru.md`, `post-ko.md`). All files must share the identical `permalink` attribute in YAML Frontmatter, but possess distinct `lang: en`/`lang: uk`/etc variables.

<br/>

### 🔍 𝚂𝙴𝙾 𝙲𝚑𝚎𝚌𝚔𝚕𝚒𝚜𝚝

<div align="center">

| Step | Requirement | Target |
| :---: | :--- | :---: |
| 1 | `<link rel="canonical">` | Page-specific URL |
| 2 | `<link rel="alternate" hreflang="en/uk/x-default">` | Both |
| 3 | `<meta property="og:locale">` + `og:locale:alternate` | Swapped per Lang |
| 4 | `<meta name="robots" content="index, follow">` | Both |
| 5 | `<meta name="keywords">` | Language-specific |
| 6 | JSON-LD `Person` schema (`affiliatedOrganization` → Wrist & Pocket) | Both |
| 7 | JSON-LD `WebSite` schema (`inLanguage: ["en", "uk"]`) | Both |
| 8 | `<meta name="google-site-verification">` | EN Only |

</div>

<br/>

### 🔄 𝙻𝚊𝚗𝚐𝚞𝚊𝚐𝚎 𝚂𝚠𝚒𝚝𝚌𝚑𝚎𝚛

Generated in `_includes/header.html` via a `{% for lang in site.languages %}` loop. Uses `{% static_href %}` to bypass Polyglot's URL rewriting:
```html
<a {% static_href %}href="/uk/"{% endstatic_href %} class="lang-switch">uk</a>

<br/>

## 📑 𝙲𝚘𝚗𝚝𝚎𝚗𝚝 𝚂𝚎𝚌𝚝𝚒𝚘𝚗𝚜 (𝙱𝚎𝚗𝚝𝚘 𝙶𝚛𝚒𝚍)

1. **BIO** — Avatar, name, roles, taglines.
2. **WRIST & POCKET STUDIO** — Showcase of the flagship studio with Wear OS CSS mockups.
3. **WEBGL PLAYGROUND** — Interactive WebGL canvas via click-to-play iFrame overlay.
4. **TECH STACK** — Grid of icons showcasing proficiencies.
5. **SHRINE** — Collection vault covering DS/Switch & Sim Racing devices.
6. **VR LIFE FEED** — Headsets, XR experiments & immersive thoughts.
7. **THE WORKSHOP FEED** — Unity dev logs, mechanics & Wear OS experiments.
8. **VLOG FEED** — Personal life, cats & dev life in Ukraine.
9. **EDUCATION FEED** — Classroom fundamentals & tutorials.
10. **UTILITY CORE** — Python tools & widgets.
11. **CONTACT** — External links / handles.

<br/>

## 🤖 𝚁𝚞𝚕𝚎𝚜 𝚏𝚘𝚛 𝙰𝙸 𝙰𝚜𝚜𝚒𝚜𝚝𝚊𝚗𝚝𝚜

> [!WARNING]
> Please adhere strictly to the rules below to ensure the stability and styling of the portfolio!

1. **Core Philosophy:** Pure HTML5, CSS3, Vanilla JS, and Liquid / Jekyll layout. No heavy NPM packages. No React.
2. **Bilingual Sync:** Write content **once** in `index.html` using localized data lookups `{{ site.data[site.active_lang].strings.key }}`. `jekyll-polyglot` generates all 4 languages automatically (`/`, `/uk/`, `/ru/`, `/ko/`) — never copy files manually.
3. **DRY Includes:** Header, nav, and footer are modularized via `_includes/`. Never duplicate these parts across documents.
4. **WebGL & Media:** WebGL canvases MUST be wrapped in a stateless click-to-play iframe overlay. Images should use `.webp` formatting and contain `loading="lazy"` tags.
5. **SEO & Performance:** Maintain microdata, JSON-LD Schema.org tags, and canonical / hreflang markers comprehensively.

<br/>

<div align="center">
  **💜 𝙼𝚊𝚍𝚎 𝚠𝚒𝚝𝚑 𝚙𝚊𝚜𝚜𝚒𝚘𝚗 𝚋𝚢 𝙵𝚒𝚐𝚊𝚛𝚒𝚜𝚝 | 𝙴𝚜𝚝. 𝟸𝟶𝟸𝟼 💜**

  <sub>𝙲𝚘𝚍𝚒𝚗𝚐, 𝙶𝚊𝚖𝚒𝚗𝚐 & 𝚅𝚒𝚋𝚒𝚗𝚐 🎮🎵✨</sub>
</div>
