# Rooted Digital

A three-page website with a continuous rotating 3D background, dimensional product previews and scroll-responsive motion. All assets and scripts run locally; no installation or build step is required.

## Preview

Extract the complete ZIP and double-click `index.html`. Follow the navigation to Work and Services. Keep every file in its supplied relative location.

## Upload to GitHub / Vercel

Upload the contents of this folder, including `assets/`, to your existing GitHub repository. Do not upload only the ZIP or an extra parent folder. Your linked Vercel project can deploy it as a static website with no build command. Existing domain settings remain with your hosting project.

## File paths

- `index.html` — homepage, dimensional device showcase and product journey.
- `work.html` — six portfolio projects with screenshots and access links.
- `services.html` — service packages, prices, process and enquiry links.
- `styles.css` — shared base styling.
- `motion.css` — homepage scene and shared moving background styles.
- `pages.css` — Work and Services styling, dimensional project frames, service panels and process line.
- `script.js` — navigation, section reveals and footer year.
- `motion-state.js` — homepage scroll/camera calculations.
- `motion.js` — homepage scene, product selectors and motion controls.
- `spatial-background.js` — rotating, shaded 3D loop rendered to Canvas on every page.
- `pages-motion.js` — Work and Services scroll movement, pointer response and motion controls.
- `assets/` — actual public landing-page screenshots captured on 14 October 2026.
- `tests/site.test.mjs` and `tests/motion.test.mjs` — code checks.

## Current update: Work and Services

Replace `work.html`, `services.html`, `pages.css` and `README.md`. Add `pages-motion.js`. Keep `motion.css`, `spatial-background.js` and all other files from the latest homepage update. No image assets or service prices changed in this update.

Work now has a dark visual treatment, browser-framed portfolio images, numbered project sections, scroll movement and subtle pointer tilt. Services has dimensional service panels, gold pricing badges, a scroll-filled process line and coordinated enquiry sections. Both pages use the same continuous 3D background and pause controls as Home.

## Motion and accessibility

Use Pause motion near the top of each page to stop the moving background and decorative movement. Operating-system reduced-motion settings are respected automatically. Animations stop in hidden tabs. Mobile uses smaller movements and a normal page flow. Product selectors remain usable with a keyboard and when motion is paused. No autoplay sound or video is used.

The background is a procedurally generated, shaded 3D mesh projected with Canvas. Devices are built with CSS perspective. The laptop shows actual public product screenshots. The phone is a Rooted Digital brand illustration, not a private app dashboard. The site has no external model, animation-library or video dependencies.

## Verification

Run `npm test` or `node --test tests/*.test.mjs`. Seven checks cover site structure, contact actions, portfolio/service content, scene progress, chapter selection and camera state. Local file links and anchors have also been checked. Browser visual review is still required before launch: check all three pages on desktop and phone, pause motion, test reduced-motion settings and follow the enquiry links.

## Contact

Enquiry buttons use `rootedwithkhethiwe@gmail.com`. Edit page text in the relevant HTML file. Service prices remain R6,500 for Websites, R18,000 for Web Apps and R12,500 for Member Platforms, each described as starting from.
