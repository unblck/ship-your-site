## Step 7: HTTPS certificate (automatic)

Docs: [HTTPS (SSL)](https://docs.netlify.com/manage/domains/secure-domains-with-https/https-ssl/)

- Once DNS points to Netlify, Netlify automatically issues and renews a free **Let's Encrypt** certificate for the apex, www, and any aliases. With Netlify DNS you get a wildcard certificate.
- Check status at **Domain management → HTTPS**.
- The certificate **can't be issued until DNS resolves to Netlify**, and old cached DNS answers must expire (TTL) first. If it's still waiting after DNS looks right, re-check the DNS values in the HTTPS panel. If only one name (for example www) is covered, click **Renew certificate**.
- Leave HSTS `preload` alone unless you know you need it, because it's hard to undo.

---

Ask your AI agent: *"Use the ship-your-site skill to help me with this step."*

Stuck? Free help at https://unblck.me
