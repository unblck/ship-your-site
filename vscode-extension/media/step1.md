## Step 1: Create a Netlify account

1. Go to https://app.netlify.com/signup. Sign up with GitHub, GitLab, Bitbucket, or email.
2. New accounts are on the **Free** plan: $0, with **300 credits/month and a hard limit**, so you can't be charged. If you run out, projects pause until the next cycle. Credit costs that matter for a small site ([how credits work](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/how-credits-work/)):
   - each successful **production deploy costs 15 credits**, so roughly 20 production deploys a month if traffic is small. Deploy Previews and branch deploys cost 0 credits, and failed deploys cost nothing.
   - bandwidth costs 20 credits/GB, and web requests cost 2 credits per 10,000.
   - Custom domains with HTTPS are included on Free ([plans](https://docs.netlify.com/manage/accounts-and-billing/billing/billing-for-credit-based-plans/credit-based-pricing-plans/)).

Tip: don't run `--prod` deploys for every small change. Use draft or preview deploys to check things, then do one production deploy.

---

Ask your AI agent: *"Use the ship-your-site skill to help me with this step."*

Stuck? Free help at https://unblck.me
