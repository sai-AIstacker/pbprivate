# PaintBharat Co. — Brand Guidelines

Read this file in full before writing or editing any CSS. Every color, font, and asset
choice in the website must trace back to a rule in this document — do not introduce new
colors, fonts, or logo treatments not listed here.

---

## 1. Brand Essence
- **Name:** PaintBharat Co.
- **Slogan:** "Where every wall tells a story."
- **Positioning:** Engineering-led painting and waterproofing partner for developers,
  builders, commercial owners, and housing societies in India. Standardized execution,
  verified quality, milestone-backed contracts.
- **Tone:** Confident, precise, engineering-minded — not folksy, not salesy. Speaks like a
  serious infrastructure/services company, not a home-improvement app.

---

## 2. Color Palette

| Swatch | Name | Hex | RGB | Primary Usage |
|---|---|---|---|---|
| 🟥 | **PaintBharat Red** | `#E30004` | 227, 0, 4 | Primary brand color. Logo mark, key CTAs, highlights, headings accents. |
| ⬛ | **Ink Black** | `#231F20` | 35, 31, 32 | Wordmark "Co", body copy, primary text on light backgrounds. |
| ⬜ | **White** | `#FFFFFF` | 255, 255, 255 | Backgrounds, reversed logo lockup, negative space. |
| ▫️ | **Neutral Light** | `#F2F2F2` | 242, 242, 242 | Section backgrounds, cards, dividers — supporting tone only. |
| ▪️ | **Neutral Mid** | `#BFBFBF` | 191, 191, 191 | Borders, captions, secondary/disabled UI elements. |

### Usage rules — non-negotiable
- **Red is the signature color and must anchor every screen** — but sparingly. It should
  read as a precise accent (a CTA button, an underline, a stat number, an icon), never as
  a large background fill, never flooding more than roughly 10% of any given viewport.
- **Never substitute Neutral Light/Mid for Red as the primary brand color.** They are
  supporting tones — dividers, card backgrounds, muted borders — not decorative colors in
  their own right.
- Ink Black is the default body text color on white/light backgrounds. Do not use pure
  black (`#000000`) anywhere — always Ink Black.
- On dark/Ink-Black backgrounds (e.g. footer, hero overlay), text defaults to white or
  `rgba(255,255,255,0.65–0.75)` for secondary text — matches the existing footer/hero
  treatment in the reference build.
- A red-dark hover state (`#B80003`) is used for CTA hover/active states — preserve this
  from the reference CSS rather than using a generic darken() filter.

### Suggested CSS custom properties
```css
:root {
  --color-red: #E30004;
  --color-red-dark: #B80003;
  --color-ink: #231F20;
  --color-white: #FFFFFF;
  --color-neutral-light: #F2F2F2;
  --color-neutral-mid: #BFBFBF;
}
```

---

## 3. Typography

- **Typeface:** Poppins (Google Fonts) — geometric, friendly, highly legible at small
  sizes. Used across all digital and print applications.
- **Weights in use:** 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold).
- **Headings (`h1`–`h3`):** weight 700, tight letter-spacing (approx. `-0.01em`), as in
  the reference file.
- **Eyebrows/labels:** weight 600, uppercase, wide letter-spacing (`0.16em`), small size
  (~12.5px), always in Red.
- **Body copy:** weight 400, Ink Black at ~68% opacity for secondary/supporting text,
  full opacity for primary text.
- Maintain a clear, consistent type scale — do not introduce arbitrary font sizes outside
  the scale already established in the reference CSS (clamp-based responsive headings,
  consistent body/caption sizes).

---

## 4. Logo & Asset Usage

### Folder reference
```
assets/brand/
├── Favicon/       → site favicons + web manifest (see head-snippet.html for markup)
├── Vector-SVG/     → PRIMARY source for all on-screen logo use
├── Web-PNG/        → fallback raster logos, multiple resolutions, web-optimized
└── Print-PNG/       → 300dpi print assets — REFERENCE ONLY, never use in the website
```

### Files available (Vector-SVG)
- `PaintBharatCo_Logo_Horizontal_FullColor.svg` — default nav/header logo on light backgrounds
- `PaintBharatCo_Logo_Horizontal_Mono_Black.svg` — single-color contexts (e.g. printed on
  colored stock, watermarks)
- `PaintBharatCo_Logo_Horizontal_Reversed_White.svg` — use on dark backgrounds (hero
  overlay, footer, Ink Black sections)
- `PaintBharatCo_Logo_Stacked_FullColor.svg` / `..._Stacked_Reversed_White.svg` — for
  narrow/square placements (e.g. mobile nav, social avatars) where horizontal lockup
  doesn't fit
- `PaintBharatCo_Mark_Only.svg` — icon/mark alone, for favicon-adjacent or tight spaces

### Usage rules
1. **Always use SVG from `Vector-SVG/` for on-screen logo instances** (nav, footer) —
   scales perfectly at any resolution, can inherit currentColor where applicable.
2. **Use the Reversed/White variant on dark backgrounds** (hero, footer) — never place the
   FullColor or Mono Black variant on a dark background where it won't have contrast.
3. **Use `Web-PNG/` only when SVG isn't practical** — e.g. Open Graph image generation,
   email templates, or any context that doesn't support SVG. Pick the smallest resolution
   that satisfies the context's actual display size — don't default to the largest file.
4. **Never use anything from `Print-PNG/` in the website.** These are CMYK-oriented,
   300dpi assets meant for physical print (business cards, signage) — wrong color profile
   and unnecessarily large for web.
5. Maintain clear space around the logo — do not crop, stretch, rotate, or recolor outside
   of the provided variants.

### Favicon
- Use the complete set in `Favicon/` — do not fall back to a single base64 icon.
- Reference `Favicon/head-snippet.html` for the exact `<link>` tags to use in `<head>`.
- Confirm `site.webmanifest` correctly references `android-chrome-192x192.png` and
  `android-chrome-512x512.png` for Android/PWA icon support.

---

## 5. Voice & Copy Principles
- Precise over promotional. Prefer "verified against a documented quality checklist" over
  "the best quality in the business."
- Numbers and specifics build credibility — keep stats like the spec strip (₹80,000+ Cr
  market, >90% unorganized, 200 contractor network target) prominent and accurate.
- Avoid exclamation points, avoid consumer-app-style casual language ("Get your painters
  in 24 hrs!") — this is a B2B, engineering-positioned brand.
- Every claim about the warranty, verification process, or data should sound falsifiable
  and specific — this is the core differentiator from competitors who "claim long
  warranties" but can't prove them.

---

## 6. What Success Looks Like Visually
A designer or engineer looking at the finished site should be able to tell, within 3
seconds and without being told, that:
1. Red is used deliberately and sparingly, not decoratively.
2. There is one typeface doing all the work, used with a clear, consistent scale.
3. Whitespace is generous — sections don't feel cramped or overloaded.
4. Nothing about the layout looks like a stock template with the logo swapped in.