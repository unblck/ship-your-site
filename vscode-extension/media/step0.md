## Step 0: Make sure you have something deployable

You need a folder of static files with an `index.html` at its root, **or** a framework project that Netlify can build.

| You built with… | Build command | Folder to deploy (publish dir) |
| --- | --- | --- |
| Plain HTML/CSS/JS | none | the folder containing `index.html` |
| Vite (React, Vue, Svelte…) | `npm run build` | `dist` |
| Create React App | `npm run build` | `build` |
| Astro | `npm run build` | `dist` |
| Next.js (static export, `output: 'export'`) | `npm run build` | `out` |
| Next.js with server features, or other SSR | let Netlify build it (Git or CLI build); see [Netlify framework docs](https://docs.netlify.com/build/frameworks/overview/) | n/a |

Quick check: run the build, then open the output folder. `index.html` must sit directly inside the folder, not in a subfolder.

**Never deploy secrets.** Check that `.env` files and API keys are not in the folder you upload. Anything in a static site is public.

---

Ask your AI agent: *"Use the ship-your-site skill to help me with this step."*

Stuck? Free help at https://unblck.me
