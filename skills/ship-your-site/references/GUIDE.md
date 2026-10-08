# Ship your local site for real: domain → Netlify → DNS → HTTPS → verified

A step-by-step guide for solo builders (and the AI agents helping them) to take a site that works on `localhost` and make it reachable by anyone at `https://yourname.com`.

Checked against Netlify's docs in October 2026. Netlify changes its UI labels now and then. If a button name doesn't match, use the linked doc page as the source of truth.

---

## How to use this guide (for AI agents)

- **Steps that need a human:** signing up for accounts, paying for a domain, logging in to the registrar, and approving the `netlify login` browser prompt. Pause and ask the user to do these. Never ask the user to paste passwords, card details, or API tokens into chat.
- **Steps an agent can do:** detect the framework and build output folder, run the build, run Netlify CLI commands after the user has logged in, write `_redirects`/`netlify.toml`, and run the verification commands in Step 8.
- **Use the user's real values:** Netlify's **Pending DNS verification** panel shows the exact DNS values for the user's site. Prefer those over the generic examples here.
- **Before changing nameservers or DNS on a domain that already has email, ask first.** Moving DNS without copying the MX records breaks the user's email.

---

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

## Step 1: Create a Netlify account

1. Go to https://app.netlify.com/signup. Sign up with GitHub, GitLab, Bitbucket, or email.
2. New accounts are on the **Free** plan: $0, with **300 credits/month and a hard limit**, so you can't be charged. If you run out, projects pause until the next cycle. Credit costs that matter for a small site ([how credits work](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/)):
   - each successful **production deploy costs 15 credits**, so roughly 20 production deploys a month if traffic is small. Deploy Previews and branch deploys cost 0 credits, and failed deploys cost nothing.
   - bandwidth costs 20 credits/GB, and web requests cost 2 credits per 10,000.
   - Custom domains with HTTPS are included on Free ([plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/)).

Tip: don't run `--prod` deploys for every small change. Use draft or preview deploys to check things, then do one production deploy.

---

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

## Step 3: Make the project public ⚠️ (new in 2026)

Docs: [Project visibility](https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/)

Teams created **on or after July 28, 2026** make new projects **private by default**. Only you can see them, and everyone else hits a Netlify login wall. That's the most common "it works for me but not for my friend" problem right now.

- Click **Make public** on the project. It appears after the first successful production deploy.
- Or go to **Project configuration → General → Visitor access → Project visibility** and set production deploys to **Public**.
- Previews stay private unless you change them separately. That's usually what you want.

Test: open the `*.netlify.app` URL in a private/incognito window. If you see the real site rather than a login screen, it's public.

---

## Step 4: Buy a domain

You can buy from any registrar. Things to compare: **renewal price** (not just year one), free WHOIS privacy, and how easy it is to change nameservers or DNS records. Here are some common choices. We don't take a cut from any of them.

| Where | Good for | Watch out for |
| --- | --- | --- |
| **Netlify itself** (Domain management → Add a domain → **Buy a new domain**) ([docs](https://docs.netlify.com/manage/domains/configure-domains/register-and-buy-a-domain/)) | Least work: Netlify DNS and HTTPS are set up automatically, so you can skip Steps 5–6 | Registered for 1 year and **auto-renews by default** on your card. No internationalized (non-ASCII) domains. Needs a payment method on the team. |
| **Cloudflare Registrar** | At-cost pricing with no markup | You **must keep Cloudflare nameservers** ([Cloudflare docs](https://developers.cloudflare.com/registrar/faq/)), so use the **external DNS** path (6B) and set records to **DNS only** (grey cloud), not proxied. |
| **Porkbun, Namecheap**, and similar retail registrars | Cheap, simple dashboards, free WHOIS privacy | Skip the upsells (hosting, email, "SSL"): Netlify gives you HTTPS free. |
| Your country's registrar or the one you already use | Local payment methods, consolidating domains | Check how to change nameservers before you pay. |

Notes:
- `.app` and `.dev` (and some other TLDs) are HTTPS-only in browsers. That's fine on Netlify, but the site won't load at all until the certificate is issued in Step 7.
- Turn on auto-renew, or set a reminder. An expired domain takes the site down and can be bought by someone else.

---

## Step 5: Add the domain to your Netlify project

Docs: [Bring a domain to Netlify](https://docs.netlify.com/manage/domains/configure-domains/bring-a-domain-to-netlify/), [Assign a domain](https://docs.netlify.com/manage/domains/manage-domains/assign-a-domain-to-your-site-app/)

1. Open your project, then **Domain management** in the left sidebar.
2. **Add a domain → Add a domain you already own**. Enter `yourname.com`, click **Verify**, then **Add domain**.
3. Netlify adds both `yourname.com` (apex) **and** `www.yourname.com`. The one you typed becomes the primary, and the other automatically redirects to it ([apex and www](https://docs.netlify.com/manage/domains/manage-domains/manage-multiple-domains/#apex-domains-and-www-subdomains)).
   - Using **Netlify DNS** (6A)? Either apex or www can be primary.
   - Using **external DNS** (6B)? Netlify **strongly recommends `www` as the primary**, because the apex can't use its CDN routing as well.
4. Next to the domain you'll see **Pending DNS verification**. Click it to get the exact records for your site. Keep that panel open for Step 6.

---

## Step 6: Point DNS at Netlify (pick 6A or 6B)

| | 6A. Netlify DNS (change nameservers) | 6B. External DNS (add records at your current DNS host) |
| --- | --- | --- |
| What you change | The 4 nameservers at your registrar | 2 DNS records at your current DNS provider |
| Best when | New domain with nothing else on it | Domain already runs email or other services, Cloudflare Registrar domains, or you want to keep DNSSEC |
| Apex domain performance | Full CDN | Load balancer only (that's why www is recommended as primary) |
| Gotchas | Copy existing records (especially **MX** for email) first, and **turn off DNSSEC** | Remove old conflicting A/AAAA/CNAME records (for example parked-page records) |

### 6A. Netlify DNS: switch nameservers

Docs: [Set up Netlify DNS](https://docs.netlify.com/manage/domains/set-up-netlify-dns/), [Netlify name servers](https://docs.netlify.com/manage/domains/configure-domains/netlify-name-servers/)

1. In **Domain management**, next to the domain, choose **Options → Set up Netlify DNS** and follow the prompts.
2. **If the domain already has records you need** (email MX, TXT verification records, other subdomains), copy them into Netlify DNS **before** switching nameservers ([DNS records](https://docs.netlify.com/manage/domains/configure-domains/dns-records/)).
3. Find your 4 nameservers in the team dashboard under **DNS** → your domain → **Name servers**. They look like `dns1.p01.nsone.net`, but use the ones Netlify shows you, because they vary by domain.
4. At your registrar, **turn off DNSSEC** if it's on. Netlify DNS doesn't support DNSSEC, and leaving it on breaks resolution ([troubleshooting](https://docs.netlify.com/manage/domains/troubleshooting-tips/)).
5. At your registrar, replace the existing nameservers with Netlify's four. Netlify links registrar-specific instructions for GoDaddy, Name.com, Hover, AWS, and others on the setup page.
6. Wait. It usually takes minutes to a few hours, and up to about a day.

### 6B. External DNS: add records

Docs: [Configure external DNS](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/)

Use the values from **Pending DNS verification** if they differ from these. Sites on Netlify's High-Performance Edge use different targets.

| Host / Name | Type | Value |
| --- | --- | --- |
| `www` | `CNAME` | `your-project-name.netlify.app` |
| `@` (or leave blank) | `ALIAS` / `ANAME` / flattened `CNAME` (preferred, if your DNS host supports it) | `apex-loadbalancer.netlify.com` |
| `@` (or leave blank) | `A` (fallback if none of the above exist) | `75.2.60.5` |

- Use **only one** of the two apex options, and delete any other `A`/`AAAA` records on `@` (registrars often add a parking-page IP).
- On **Cloudflare**, set both records to **DNS only** (grey cloud). Cloudflare's proxy stops Netlify from issuing your certificate ([Netlify troubleshooting](https://docs.netlify.com/manage/domains/troubleshooting-tips/#certificates-and-https)).
- If you already have a **CAA** record, it must allow `letsencrypt.org`, or the certificate won't be issued ([HTTPS docs](https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/#netlify-managed-certificates)).
- Changes can take several hours, and up to a day.

---

## Step 7: HTTPS certificate (automatic)

Docs: [HTTPS (SSL)](https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/)

- Once DNS points to Netlify, Netlify automatically issues and renews a free **Let's Encrypt** certificate for the apex, www, and any aliases. With Netlify DNS you get a wildcard certificate.
- Check status at **Domain management → HTTPS**.
- The certificate **can't be issued until DNS resolves to Netlify**, and old cached DNS answers must expire (TTL) first. If it's still waiting after DNS looks right, re-check the DNS values in the HTTPS panel. If only one name (for example www) is covered, click **Renew certificate**.
- Leave HSTS `preload` alone unless you know you need it, because it's hard to undo.

---

## Step 8: Verify from outside your own machine

Your own browser and router cache old DNS answers, so test from the outside. Replace `yourname.com` with the real domain.

```bash
# 1. DNS points to Netlify
dig +short yourname.com            # expect 75.2.60.5 or Netlify IPs
dig +short www.yourname.com        # expect your-project.netlify.app → IPs
dig +short NS yourname.com         # 6A: expect Netlify's nsone.net nameservers

# 2. Served by Netlify over HTTPS
curl -sI https://yourname.com | grep -iE "^(HTTP|server|location)"
#   expect: HTTP/2 200 (or 301 if this is the non-primary name) and server: Netlify

# 3. www and apex redirect to the primary
curl -sI https://www.yourname.com | grep -iE "^(HTTP|location)"   # 301 → primary (if apex is primary)

# 4. Plain HTTP upgrades to HTTPS
curl -sI http://yourname.com | grep -iE "^(HTTP|location)"        # 301 → https://...

# 5. Deep links work (SPAs)
curl -sI https://yourname.com/some/route | head -1                 # 200, not 404
```

No terminal? Use Google's browser-based dig (https://toolbox.googleapps.com/apps/dig/). Then open the site on your **phone with Wi-Fi off** and in an **incognito window**. If both show the real site with a padlock, you're live. 🎉

---

## Common failures and fixes

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Friends see a Netlify login page | Project is **private** (default for new teams since July 28, 2026) | **Make public** (Step 3) |
| Site at netlify.app shows "Page not found" | Deployed the wrong folder, so `index.html` isn't at the root | Deploy the build output (`dist`/`build`/`out`), not the project root |
| Home page works but refreshing `/about` gives 404 | SPA routing | Add `_redirects` with `/* /index.html 200` |
| Blank page with console errors about `/assets/...` | Build `base` path set for a subfolder | Set the base to `/` (for example Vite `base: '/'`), rebuild |
| Page loads but data/API calls fail | Env vars or API keys only exist locally, or the API URL is `localhost` | Add env vars in Netlify (**Project configuration → Environment variables**) and rebuild. Never put secret keys in front-end code. |
| Domain shows the registrar's parking page | Old A record still there, or DNS not propagated | Delete parking records. Check with `dig`, and wait out the TTL. |
| "Pending DNS verification" won't clear | Records wrong or not propagated yet | Compare with the panel's exact values. Flush Google's DNS cache: https://developers.google.com/speed/public-dns/cache |
| "Doesn't appear to be served by Netlify" | Apex A record wrong, or a proxy (Cloudflare orange cloud) in front | Fix the A/ALIAS record, set Cloudflare to DNS only, then check for `server: Netlify` in `curl -sI` |
| "Not resolvable with a resolver that validates DNSSEC" | DNSSEC still on while using Netlify DNS | Turn off DNSSEC at the registrar, or use external DNS (6B) |
| HTTPS works on apex but not www (or the reverse) | Certificate issued before both names resolved | Fix DNS for the missing name, then **Renew certificate** |
| Email stopped working after the switch | MX records weren't copied into Netlify DNS | Add the MX (and SPF/DKIM TXT) records in Netlify DNS |
| Projects suddenly paused | Free plan's 300 credits used up (often too many prod deploys) | Batch changes, use draft deploys, or wait for the next cycle or upgrade |
| Drop upload hangs | Huge files (>10 MB) or a >50 MB deploy | Use the CLI (Option B) and remove large unused files |

More: [Netlify DNS & HTTPS troubleshooting](https://docs.netlify.com/manage/domains/troubleshooting-tips/), [Ask Netlify / support](https://docs.netlify.com/resources/troubleshooting/ask-netlify/)

---

## Netlify docs used

- Create deploys: https://docs.netlify.com/deploy/create-deploys/
- Netlify Drop quickstart: https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/
- Netlify CLI: https://docs.netlify.com/api-and-cli-guides/cli-guides/get-started-with-cli/
- Project visibility: https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/
- Credit-based plans: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/
- How credits work: https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/
- Get started with domains: https://docs.netlify.com/manage/domains/get-started-with-domains/
- Register and buy a domain: https://docs.netlify.com/manage/domains/configure-domains/register-and-buy-a-domain/
- Bring a domain to Netlify: https://docs.netlify.com/manage/domains/configure-domains/bring-a-domain-to-netlify/
- Assign a domain: https://docs.netlify.com/manage/domains/manage-domains/assign-a-domain-to-your-site-app/
- Manage multiple domains (apex and www): https://docs.netlify.com/manage/domains/manage-domains/manage-multiple-domains/
- Set up Netlify DNS: https://docs.netlify.com/manage/domains/set-up-netlify-dns/
- Netlify name servers: https://docs.netlify.com/manage/domains/configure-domains/netlify-name-servers/
- Configure external DNS: https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/
- HTTPS (SSL): https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/
- DNS & HTTPS troubleshooting: https://docs.netlify.com/manage/domains/troubleshooting-tips/
- SPA rewrites: https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps

---

Stuck somewhere in this? I'm Chakra, and I help solo builders get unstuck for free: https://unblck.me
