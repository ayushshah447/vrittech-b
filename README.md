# Task B: Services & Courses

A responsive build of the "service" and "Course" frames from the Figma file, made with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS v4.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## What's on the page

**Services**
- An intro paragraph and a **Services** pill. On hover it widens from 106 to 176 px, darkens, and cross-fades its label to "Start Your Project" (300 ms ease-out), like the Figma hover variant.
- **Rolling service names.** These follow the prototype's `animate` component. Each row is a clipping window onto the same three words, and every 3 seconds it steps to the next variant: UI & UX (top-aligned, 53 px), Development (centred, 53 px), Blockchain (bottom-aligned, 66 px). It moves with a 300 ms ease-out, so the last step slides back down to the first word, as in Figma. The rows stay still for users who prefer reduced motion.
- **Drag carousel.** Drag with the mouse to move one slide at a time. A "Drag" bubble follows the cursor and rests on the current slide, as in the design. Touch devices get native swiping with scroll-snap, and keyboard users can focus the carousel and use the arrow keys. The progress bar tracks the scroll position.
- **Partner logos.** Cropped and greyscaled the way the Figma image fills are.

**Courses**
- Three stat cards. Clicking (or pressing Enter on) a pink card makes it the active red card. Every layer moves between its positions in the Figma variants over 1 s on the "ease in and out back" curve, the same way Figma's Smart Animate does:
  - the card widens and its neighbour narrows
  - the blush circle shrinks into the bottom-left corner
  - the icons slide in from the left as they fade in
  - the count slides from the centre and changes colour
  - the title swings from vertical to flat around its corner, re-wrapping as its box widens
- Hovering an inactive card fades in the "Click me!" hint using Figma's Gentle spring. Each card's button reports its state with `aria-pressed`, and inactive links are `inert`, so they are skipped by keyboard and screen readers.

## Responsive behaviour

- **1280px and up:** the desktop layout. From about 1366px it matches the design exactly (at 1440px the content column is 1216px with 112px side margins). Between 1280 and 1365px the active card is narrower, so a long title such as "Upcoming Courses" wraps onto two lines instead of being clipped.
- **Below 1280px:** the cards stack. Inactive cards collapse to a single row; the active card shows the full layout.
- **Below 1024px:** the hero text and service names stack, and the partner logos move to a two- or four-column grid.

## Notes

- **Fonts.** The design uses Oakes Grotesk and Nohemi, which are commercial typefaces. Two free substitutes were chosen by measuring rendered text against the Figma export:
  - Plus Jakarta Sans for Oakes Grotesk
  - Archivo, at a 110% width for the numerals, for Nohemi

  Manrope and Outfit are used exactly as specified. Every face is loaded through `next/font`.
- **Measurements.** Positions, sizes, colours, timings and easing come from the Figma file and its prototype data.

## Structure

```
app/                 layout (fonts, metadata), page, global theme tokens
components/services  ServicesSection, ServiceTicker, CtaButton, DragCarousel, Partners
components/courses   CoursesSection, CourseStats (state), StatCard, StatCount, CourseIconStrip, ViewAllLink
components/ui        shared icons
content/             typed copy and asset data for both sections
lib/fonts.ts         next/font setup
public/images        slides, partner logos, course icons exported from Figma
```
