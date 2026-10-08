## Step 5: Add the domain to your Netlify project

Docs: [Bring a domain to Netlify](https://docs.netlify.com/manage/domains/configure-domains/bring-a-domain-to-netlify/), [Assign a domain](https://docs.netlify.com/manage/domains/manage-domains/assign-a-domain-to-your-site-app/)

1. Open your project, then **Domain management** in the left sidebar.
2. **Add a domain → Add a domain you already own**. Enter `yourname.com`, click **Verify**, then **Add domain**.
3. Netlify adds both `yourname.com` (apex) **and** `www.yourname.com`. The one you typed becomes the primary, and the other automatically redirects to it ([apex and www](https://docs.netlify.com/manage/domains/manage-domains/manage-multiple-domains/#apex-domains-and-www-subdomains)).
   - Using **Netlify DNS** (6A)? Either apex or www can be primary.
   - Using **external DNS** (6B)? Netlify **strongly recommends `www` as the primary**, because the apex can't use its CDN routing as well.
4. Next to the domain you'll see **Pending DNS verification**. Click it to get the exact records for your site. Keep that panel open for Step 6.

---

Ask your AI agent: *"Use the ship-your-site skill to help me with this step."*

Stuck? Free help at https://unblck.me
