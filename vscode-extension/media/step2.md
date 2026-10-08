## Step 2: Deploy to a `*.netlify.app` URL

Pick **one** option.

### Option A: Drag and drop (no terminal)

Docs: [Netlify Drop quickstart](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/), [Create deploys → Drag and drop](https://docs.netlify.com/deploy/create-deploys/#drag-and-drop)

1. Log in first, at https://app.netlify.com/login. If you drop without logging in, the site is temporary and password-protected, and you must claim it within **one hour** or it's deleted.
2. Open https://app.netlify.com/drop.
3. Drag your **output folder** (or a zip of it) onto the drop zone. If you're logged in, you can also drop an unbuilt project and Netlify will detect the framework and build it.
4. You get a URL like `https://random-name-12345.netlify.app`.
5. To update the site later, open the project's dashboard and drag the new folder onto the drop area under **Production deploys**.

Drop limits: deploys under 50 MB work best, and single files over 10 MB can make a deploy hang. For anything larger, use the CLI.

### Option B: Netlify CLI (best for agents, repeatable)

Docs: [Get started with Netlify CLI](https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/)

```bash
npm install -g netlify-cli      # needs Node.js installed
netlify login                   # opens a browser; the human approves access
npm run build                   # or whatever builds your site
netlify deploy --dir=dist       # draft deploy: prints a preview URL to check
netlify deploy --prod --dir=dist  # production deploy to your main URL
```

- The first `netlify deploy` asks whether to create a new project or link an existing one, and saves the link in `.netlify/state.json`. Add `.netlify/` to `.gitignore`.
- Replace `dist` with your publish folder from Step 0.
- No account yet? `netlify deploy --allow-anonymous` creates a temporary live URL that you must claim within one hour.
- For CI, install the CLI as a dev dependency and authenticate with a `NETLIFY_AUTH_TOKEN` secret instead of `netlify login`.

### Option C: Connect a Git repo (auto-deploy on every push)

In the Netlify UI, add a new project by importing an existing project from your Git provider, then pick your repo. Set the build command and publish directory from Step 0. Every push to the production branch deploys and costs 15 credits each time on the Free plan. Docs: [Create deploys → Deploy with Git](https://docs.netlify.com/deploy/create-deploys/#deploy-with-git)

### If your app uses client-side routing (React Router, Vue Router…)

Refreshing `/about` returns a 404 unless you add a rewrite. Create a file named `_redirects` **inside the publish folder** (for Vite, put it in `public/` so it gets copied to `dist/`):

```
/*    /index.html   200
```

Docs: [Rewrites → History pushState and single-page apps](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps)

---

Ask your AI agent: *"Use the ship-your-site skill to help me with this step."*

Stuck? Free help at https://unblck.me
