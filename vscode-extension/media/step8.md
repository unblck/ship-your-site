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

Ask your AI agent: *"Use the ship-your-site skill to help me with this step."*

Stuck? Free help at https://unblck.me
