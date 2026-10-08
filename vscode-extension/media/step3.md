## Step 3: Make the project public ⚠️ (new in 2026)

Docs: [Project visibility](https://docs.netlify.com/manage/security/secure-access-to-sites/project-visibility/)

Teams created **on or after July 28, 2026** make new projects **private by default**. Only you can see them, and everyone else hits a Netlify login wall. That's the most common "it works for me but not for my friend" problem right now.

- Click **Make public** on the project. It appears after the first successful production deploy.
- Or go to **Project configuration → General → Visitor access → Project visibility** and set production deploys to **Public**.
- Previews stay private unless you change them separately. That's usually what you want.

Test: open the `*.netlify.app` URL in a private/incognito window. If you see the real site rather than a login screen, it's public.

---

Ask your AI agent: *"Use the ship-your-site skill to help me with this step."*

Stuck? Free help at https://unblck.me
