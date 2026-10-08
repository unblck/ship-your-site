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

Ask your AI agent: *"Use the ship-your-site skill to help me with this step."*

Stuck? Free help at https://unblck.me
