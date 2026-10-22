# HACK36 10.0 — OVERRIDE

Single-page cyberpunk site for Hack36, the annual hackathon of MNNIT Allahabad.
Next.js 16 (App Router, JavaScript) · GSAP + ScrollTrigger · Lenis smooth scroll · CSS Modules.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

## Editing content

All copy lives in **`src/data/site.js`**: dates, links, tracks, timeline, prizes, sponsors, FAQ, socials.
Items marked `TODO` are placeholders. Set them before launch:

- `event.startsAt` (drives the countdown), `event.dateLabel`, `event.registerUrl`
- `tracks`, `timeline`
- `prizes[].amount` (while `null`, the card shows an animated "encrypted" value)
- `sponsors` (currently last year's partners)

## Structure

```
src/
  app/            layout (fonts, metadata), page (section order), globals.css (design tokens)
  data/site.js    all content
  lib/            gsap.js (plugin registration), lenis.js (scrollTo helper),
                  useScrollAnim.js (scoped, responsive, reduced-motion-aware GSAP hook)
  components/
    layout/       Navbar (scroll progress, mobile menu), Footer, SmoothScroll
    sections/     Hero, Stats, About, Tracks, Timeline, Prizes, Sponsors, Faq, Cta
    ui/           Button, SectionHead, ScrambleText, Cipher, Countdown, Icon
```

## Motion and performance notes

- No WebGL. All 3D work (grid floor, cube, track ring, podium, tunnel) uses CSS 3D transforms, which run on the GPU.
- Animations only touch `transform` and `opacity`, plus SVG `stroke-dashoffset` for the line-drawing effects.
- The skyline SVG comes from a seeded generator, so it renders as static markup.
- FAQ uses native `<details>`, and the sponsor marquee is pure CSS. Neither ships any JS.
- Touch devices keep native scrolling (Lenis only smooths the mouse wheel).
- `prefers-reduced-motion` turns off every scroll animation, and the layouts fall back to static grids.
- Use `gsap.fromTo` (not `from`) for entrance tweens, so a re-run never captures a mid-animation value as the end state.
