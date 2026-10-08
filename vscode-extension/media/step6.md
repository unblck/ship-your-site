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

Ask your AI agent: *"Use the ship-your-site skill to help me with this step."*

Stuck? Free help at https://unblck.me
