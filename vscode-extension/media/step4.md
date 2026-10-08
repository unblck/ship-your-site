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

Ask your AI agent: *"Use the ship-your-site skill to help me with this step."*

Stuck? Free help at https://unblck.me
