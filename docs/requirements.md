PaintBharat Co. — Website Requirements
1. Project Summary

PaintBharat is an engineering-led, B2B painting and waterproofing services company for Indian real estate developers, builders, commercial facility owners, and housing societies (RWAs). This is our public launch/landing page — it must read as a serious, funded, category-defining company, not a template site.

Primary audiences (in priority order):

Developers/builders evaluating us for pilot projects
Investors evaluating us for funding
Material/logistics/insurance partners

Reference file: src/index.html contains the current v1 build (structure, copy, inline CSS/JS). Treat this as the content and information-architecture baseline — refine and elevate it, do not discard the messaging or restructure sections without a clear reason.

2. Design Benchmark — what "world-class" means here

Do not treat this as "add more animation and gradients." The sites below are considered premium specifically because of restraint, not decoration. Match their principles, not their literal layouts:

jpmorgan.com — extreme whitespace discipline, a tight typographic scale, almost no color outside of brand accent, motion so subtle it's barely noticed
asianpaints.com — confident use of a single brand color as an accent (never as a background flood), large clean product/process photography, clear content hierarchy
Linear.app / Stripe.com (secondary references for SaaS-grade polish) — precise spacing rhythm, crisp micro-interactions, fast perceived performance

The differentiator to aim for: consistency and craft at the detail level — spacing scale, one font used with authority, disciplined color, tight copy, zero visual noise. Prefer removing an element over adding a flashy one.

3. Brand Compliance

Full brand rules live in assets/brand/brand-guidelines.md — read that file in full before writing any CSS. Key non-negotiables:

PaintBharat Red (
#E30004) is the only accent color — used sparingly (CTAs, key highlights, headings), never as a large background fill or flooded across a section.
Ink Black (
#231F20) carries body copy and the "Co" wordmark treatment.
Neutral Light / Neutral Mid are supporting tones only — never substitute for red as the primary brand color.
Typography: Poppins, across all weights used in the reference file (300/400/500/600/700).
Logo: use assets/brand/Vector-SVG/ as the default source for all on-screen logo instances (nav, footer, favicon fallback graphics). Use Web-PNG/ only where SVG isn't practical (e.g. email-safe contexts, generated OG image). Never use Print-PNG/ in the web build — those are 300dpi CMYK-oriented assets, wrong color space and far too large for web.
4. Technical Requirements
4.1 Code structure
Split the current single-file src/index.html into:
src/index.html — structure only
src/css/styles.css — all styling, refactored to use CSS custom properties (variables) for every brand color, font size in the type scale, and spacing unit
src/js/main.js — all behavior (nav scroll state, tab switching, FAQ accordion, form handling, scroll-reveal observer)
Use semantic HTML5 (<nav>, <header>, <main>, <section>, <footer>) — the reference file mostly does this already; preserve it.
No inline style="" attributes except where truly one-off and justified.
No inline onclick="" handlers in the final version — move to proper event listeners in main.js.
4.2 Favicons
Reference file currently has a single base64-encoded favicon. Replace entirely with the full set from assets/brand/Favicon/.
Check assets/brand/Favicon/head-snippet.html — it likely contains ready-made <link> tags for all favicon sizes and the web manifest. Use it as the basis for the <head> favicon block instead of writing it from scratch.
Confirm site.webmanifest is correctly linked and its icon paths resolve.
4.3 Assets
Replace the base64 inline logo images in <nav> and <footer> with real <img src=""> or inlined <svg> referencing assets/brand/Vector-SVG/.
Replace the Pexels stock hero video with our own asset once available (placeholder in assets/video/ in the meantime) — flag this as a known placeholder, don't hide it.
All images: proper alt text, loading="lazy" except above-the-fold hero content.
4.4 Forms

The three forms (Investor / Customer-Pilot / Partner) currently only fake a confirmation message on submit — no data is sent anywhere. Before this is production-ready:

Wire all three forms to a real endpoint (Formspree, or a webhook we specify later).
Add real client-side validation with inline error messages (not just required attributes) — clear, specific errors, not generic "this field is required."
Add a loading/submitting state on the button (disable + spinner or text change) so users don't double-submit.
Preserve the existing tab-based UI pattern (Investor / Customer / Partner) — it's a good pattern, just needs a working backend hook.
Remove the form-note HTML comment about "temporary launch page" once forms are wired.
4.5 Performance
Target Lighthouse scores: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 (mobile and desktop).
Compress and appropriately size all images; serve responsive image sizes where relevant (the Web-PNG folder already has multiple resolutions — use the right one per context, don't always serve the largest).
Minify CSS/JS for the production build.
No render-blocking resources that aren't essential for above-the-fold content.
4.6 Accessibility
Full keyboard navigability (tab order, visible focus states — do not remove outline without replacing it with an equally visible custom focus style).
Correct heading hierarchy (one <h1>, logical <h2>/<h3> nesting — check the current file for skipped levels).
All form inputs have associated <label> elements (already true in the reference file — preserve this).
Color contrast: verify red-on-white and white-on-red combinations meet WCAG AA at their used text sizes.
Respect prefers-reduced-motion for all scroll-reveal and hover animations (already partially handled in the reference CSS — extend this to any new motion added).
4.7 Responsive behavior
Must be tested (not just assumed) at real breakpoints: 375px, 768px, 1024px, 1440px+.
Nav must collapse to a usable mobile menu below 860px (the reference file hides nav links below that width but the toggle button has no functionality yet — this needs to be built, not left as a dead button).
4.8 SEO / GEO
Keep the existing JSON-LD structured data (Organization + FAQ schema) in sync with any content changes — if FAQ copy changes, update the schema to match.
Replace the OG image URL (currently a Pexels stock video poster) with a real, owned, static image asset once available.
Verify canonical URL, meta description, and title tag remain accurate after any content edits.
5. Motion & Interaction Guidelines
Scroll-reveal, hover states, and nav-shrink-on-scroll from the reference file are good starting points — refine timing/easing, don't remove.
Motion should feel "expensive" — slow enough to notice, fast enough to not feel laggy. Aim for 200–400ms transitions with an eased curve, not linear.
No motion that triggers on every scroll tick repeatedly (should trigger once via IntersectionObserver, as the reference file already does — preserve this pattern).
No autoplay sound, no popups/modals unless explicitly requested later.
6. Explicitly Out of Scope (for now)
No backend/database/CMS build — forms just need a working submission endpoint.
No user authentication or dashboard.
No multi-language support yet.
No blog/CMS-driven content section yet.
7. Definition of Done

A change is production-ready when:

 CSS and JS are in separate files, no inline styles/scripts remain
 All brand colors are CSS custom properties, matching brand-guidelines.md exactly
 Full favicon set is wired via <link> tags + working site.webmanifest
 Logo uses SVG from Vector-SVG/, not base64 PNG
 All 3 forms submit to a real endpoint with validation and loading states
 Lighthouse scores meet the targets in 4.5
 Keyboard navigation works end-to-end, focus states are visible
 Mobile nav toggle is functional
 No console errors or warnings
 Tested at all four breakpoints listed in 4.7