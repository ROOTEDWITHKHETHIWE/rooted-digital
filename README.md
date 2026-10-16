# Rooted Digital

A static three-page website for Rooted Digital — websites, web apps and member platforms for meaningful work.

## Preview it locally

You can double-click `index.html` to open the site in a browser. Because the site has no build step, database or server, it will work immediately.

## Put it on GitHub

1. Create a new empty GitHub repository, for example `rooted-digital`.
2. Upload the contents of this folder — not the parent folder itself — to the new repository.
3. Keep these files together: `index.html`, `work.html`, `services.html`, `styles.css`, `pages.css`, `script.js`, `package.json` and this `README.md`.

## Deploy on Vercel

1. Sign in to Vercel with the GitHub account that owns the repository.
2. Select **Add New → Project**, then import the `rooted-digital` repository.
3. Vercel will recognise it as a static site. Leave the build command blank and deploy.
4. Every future change you push to GitHub will trigger a new Vercel deployment automatically.

## Connect a domain later

1. Buy your preferred domain when you are ready, for example `rooteddigital.co.za` or `rooteddigital.com` if available.
2. In the Vercel project, open **Settings → Domains** and add the domain.
3. Vercel will show the exact DNS record(s) to add at the domain provider.
4. Once the DNS change has propagated, set the chosen domain as the primary domain in Vercel.

## Make updates

- Update website copy directly in the three `.html` files.
- Shared visual styling lives in `styles.css`; Work and Services page styling lives in `pages.css`.
- The email address used by all contact buttons is `rootedwithkhethiwe@gmail.com`.
- The site uses only local files and can remain on GitHub and Vercel’s free tiers.

## October 14 visual update

The homepage now leads with what Rooted Digital builds. Local screenshots show the actual public landing pages of Dream Stewardship, The Ministry of the Womb and Rooted Market Intelligence, captured on 14 October 2026. These are public landing-page views, not signed-in dashboards. Private platform descriptions remain on the Work page. All arrows are drawn SVGs. Product screens float gently and links respond on hover; reduced-motion preferences are respected.

Upload **all extracted files and the assets folder** together to replace your existing website files. Keep the folder structure intact. No install or build command is needed. Open index.html to preview. Existing service prices and the contact email are preserved.

## Portfolio additions

Woman Restored uses its actual public app entry screen and links to https://woman-restored.vercel.app/. Rooted with Khethiwe represents the course platform with its actual catalogue screenshot and links to https://www.rootedwithkhethiwe.space/courses. Public screenshots were captured on 14 October 2026. Member prayer content remains protected by the app.


## October 16 — living product showcase

The homepage now has a continuous dimensional scene: laptop, phone, orbital rings, floating spheres and ambient light. Desktop scrolling controls the scene angle and moves through three real public product screens. Pointer movement adds a small depth response on a mouse. Product selector buttons also work with a keyboard. Mobile uses a normal page flow with a smaller scene and product selector buttons.

This is built with CSS perspective and small local JavaScript files, rather than a downloadable WebGL model or video. The laptop uses existing public product screenshots; the phone shows a Rooted Digital brand illustration, not a signed-in app screen.

### Files to upload

Upload all extracted files and the `assets/` folder. Keep these new files at the top level beside `index.html`:

- `motion.css` — dimensional devices, background, animation and responsive layouts.
- `motion-state.js` — scroll progress and camera state.
- `motion.js` — scene updates, product selection, pause control and pointer interaction.

The homepage remains `index.html`. `work.html` and `services.html` retain the existing portfolio and service information. No installation, subscriptions or build step is required. Double-click `index.html` after extracting the ZIP to preview. Upload the folder contents to your existing GitHub repository to update your Vercel site.

### Motion and access

Use “Pause motion” at the top of the homepage to stop ambient animation and camera movement. Operating-system reduced-motion settings are respected automatically. Product selectors stay usable when motion is paused. Hidden chapter links are removed from keyboard navigation. No autoplay sound or video is used.

### Verification

Run `npm test` to check scene progress, chapter selection, reduced-motion camera state and the existing site checks. Browser visual review is still required before launch; check desktop and phone layouts, scroll through all three products, use the selectors and pause control, and verify enquiry links.
