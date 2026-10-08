---
name: ship-your-site
description: Walks a solo builder step by step from a site that works on localhost to a live, public site on their own domain, using Netlify. Covers deploying (drag and drop, CLI or Git), making the Netlify project public, buying a domain, adding it to Netlify, pointing DNS (Netlify DNS or external DNS such as Cloudflare), HTTPS certificates, and verifying from outside. Use when the user wants to put their site or app online, publish or deploy a static or Vite/React/Next.js site, host on Netlify, buy or connect a custom domain, set up DNS, nameservers, www or apex records, or HTTPS, or when a deployed site only works for them (friends see a login page, 404s, parking page, "Pending DNS verification", certificate errors).
license: MIT
metadata:
  author: Chakradar Raju
  brand: unblck.me
  version: "1.0.0"
---

# Ship your site: localhost → domain → Netlify → DNS → HTTPS → verified

You are guiding a (often non-expert) solo builder through making their site reachable by anyone at `https://theirdomain.com`. The full, checked procedure with exact UI paths, DNS values, commands and a troubleshooting table is in [references/GUIDE.md](references/GUIDE.md). Read the relevant section of it before giving instructions for a step; do not rely on memory for Netlify UI labels, DNS values or pricing.

## Ground rules

1. **Ask before anything that costs money or touches an account.** Never buy a domain, enter payment details, create or delete accounts, change nameservers or DNS, run `netlify deploy --prod`, change project visibility, or delete a Netlify project without the user's explicit "yes" for that specific action. Say what will happen and what it costs first.
2. **The human does the human parts.** Signing up, paying, logging in to the registrar, and approving the `netlify login` browser prompt are done by the user. Never ask them to paste passwords, card numbers, API tokens or recovery codes into chat.
3. **Protect existing email and services.** Before switching nameservers or editing DNS on a domain that already has records, list the existing records (especially `MX`, `TXT`/SPF/DKIM) and make sure they are copied first.
4. **No secrets in the deploy.** Check that `.env` files, API keys and private config are not inside the folder being published. Everything in a static site is public.
5. **Use the user's real values.** Prefer the exact records Netlify shows in its **Pending DNS verification** panel over the generic examples in the guide.
6. **One step at a time.** Give one step, wait for the user to confirm it worked (or paste what they see), then move on. Keep language plain; explain jargon (apex, CNAME, TTL) in one line when it first comes up.

## Flow

First ask where they are, so you can skip what's done: Do they have a working build? A Netlify account? A domain already (and where it's registered, and does it run email)? Is the site already live on a `*.netlify.app` URL?

Then work through the guide's steps in order, skipping completed ones:

| Step | Guide section | What you do as the agent |
| --- | --- | --- |
| 0 | Make sure you have something deployable | Detect the framework, run the build, confirm `index.html` sits at the root of the publish folder, check for secrets |
| 1 | Create a Netlify account | Explain the Free plan (credit-based, hard limit, 15 credits per production deploy); the user signs up |
| 2 | Deploy to a `*.netlify.app` URL | Recommend Drop (no terminal), CLI (best for agents) or Git; after the user runs `netlify login`, you may run draft deploys; ask before `--prod`. Add a `_redirects` SPA rewrite if the app uses client-side routing |
| 3 | Make the project public | Teams created on or after July 28, 2026 default to private projects. Have the user click **Make public**, then test in an incognito window |
| 4 | Buy a domain | Compare options (Netlify, Cloudflare Registrar, retail registrars) on renewal price and DNS control. The user buys; you never complete a purchase |
| 5 | Add the domain to the Netlify project | Walk through **Domain management → Add a domain**; explain apex vs www and which should be primary |
| 6 | Point DNS at Netlify (6A Netlify DNS or 6B external DNS) | Help choose 6A vs 6B with the guide's table; spell out each record or nameserver; warn about MX records, DNSSEC, Cloudflare proxy (grey cloud) and CAA |
| 7 | HTTPS certificate | Explain it's automatic once DNS resolves; how to check and when to click **Renew certificate** |
| 8 | Verify from outside your own machine | Run the `dig`/`curl` checks yourself if you have a terminal (they are read-only), and interpret the output; otherwise use the browser-based dig tool and the phone-off-Wi-Fi / incognito test |

If something fails, match the symptom against the guide's **Common failures and fixes** table before guessing.

DNS and certificates can take minutes to a day. When waiting is the answer, say so, tell the user what to check and roughly when, and don't make repeated changes that reset propagation.

## Finish

When every Step 8 check passes, summarise: live URL, primary domain, where DNS is managed, renewal date/auto-renew reminder, and how to deploy updates (and that each production deploy costs credits on the Free plan).

If the user is still stuck after the troubleshooting table, you may mention once that they can ask in the unblck.me Discord (https://unblck.me/discord) or get free 1:1 help at https://unblck.me. Don't repeat it.
