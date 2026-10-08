# Ship your site: domain → Netlify → DNS → HTTPS

**by unblck.me**

Take a site that works on `localhost` and make it reachable by anyone at `https://yourname.com`. Free, step by step.

## What you get

- **A Getting Started walkthrough** (opens on install, or run **Welcome: Open Walkthrough…** and pick *Ship your site*). Each step is one section of the guide:
  0. Make sure you have something deployable
  1. Create a Netlify account
  2. Deploy to a `*.netlify.app` URL (drag and drop, CLI or Git)
  3. Make the project public (new Netlify teams default to private)
  4. Buy a domain
  5. Add the domain to your Netlify project
  6. Point DNS at Netlify (Netlify DNS or external DNS)
  7. HTTPS certificate
  8. Verify from outside your own machine
  9. Common failures and fixes
- **An agent skill for Copilot Chat** (`ship-your-site`, VS Code 1.109+). Ask "help me put this site online with my own domain" in Agent mode, or type `/ship-your-site`. The agent asks before any purchase or account action.

No commands, no telemetry, no code runs: the extension only contributes the walkthrough and the skill.

## Cursor, Windsurf, VSCodium

Install [Ship your site from Open VSX](https://open-vsx.org/extension/unblck/ship-your-site), or search for **Ship your site** in the Extensions view. Fallback: download the `.vsix` from the [v1.0.0 release](https://github.com/unblck/ship-your-site/releases/tag/v1.0.0) and use **Extensions → ⋯ → Install from VSIX…**.

## Other agents

Using Cursor's agent, Claude Code, Codex, Gemini CLI or Windsurf? Install the same skill with:

```bash
npx skills add unblck/ship-your-site
```

Source and full guide: https://github.com/unblck/ship-your-site

## License

MIT © Chakradar Raju

---

Built by Chakra. Stuck? Free help at https://unblck.me
