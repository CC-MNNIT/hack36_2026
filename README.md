# HACK36 10.0 — OVERRIDE

Single-page cyberpunk site for Hack36, the annual hackathon of MNNIT Allahabad.
Next.js 16 (App Router, JavaScript) · GSAP + ScrollTrigger · Lenis smooth scroll · CSS Modules.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export -> out/
```

## Editing content

All copy lives in **`src/data/site.js`**: dates, links, tracks, timeline, prizes, sponsors, FAQ, socials.
Items marked `TODO` are placeholders. Set them before launch:

- `event.startsAt` (drives the countdown), `event.dateLabel`, `event.registerUrl`
- `tracks`, `timeline`
- `prizes[].amount` (while `null`, the card shows an animated "encrypted" value)
- `sponsors` (currently last year's partners)

## Deployment

The site is a static export (`output: "export"`), served by nginx at
`hack36.in`. Nothing runs server-side: no Node process, no port, no service.

On the deploy host, once:

```bash
git clone https://github.com/CC-MNNIT/hack36_2026.git ~/repos/cc_club_mnnit/hack36_2026
sudo install -m 755 deploy/hack36-deploy-sync /usr/local/bin/
sudo install -m 440 deploy/hack36-deploy.sudoers /etc/sudoers.d/hack36-deploy
sudo visudo -c
```

Then every deploy is:

```bash
bash deploy.sh
```

which pulls `main`, runs `npm ci && npm run build` inside `shell.nix`
(Node 22; the host Node is too old for Next 16), checks that `out/index.html`
exists, and publishes `out/` to `/var/www/hack36.in/html` through
`hack36-deploy-sync`. The nginx vhost is kept in `deploy/hack36.in.conf`.

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
