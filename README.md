# CarSoup Car Concierge

A Next.js marketing site and gated member app for CarSoup Car Concierge — a car-buying concierge service for Minnesota buyers.

## What's in the box

- **Public marketing site** (server-rendered, SEO/GEO-ready): hero, problem, how it works, pricing, features, trust, FAQ, footer
- **Gated member app** (`/app`): Voiceflow chatbot, ebook download, engagement status, upgrade flow
- **Auth**: Supabase email/password (Google OAuth TODO)
- **Payments**: Stripe Checkout, one-time mode, Advisor ($99) and Personal Shopper ($499)
- **Upgrade flow**: Advisor → Personal Shopper for $400 diff, expiry preserved
- **Webhooks**: Stripe → Supabase engagement insert/update
- **Dev tools**: mock chat, simulate-payment route, seed script

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[YOUR_PROJECT].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[YOUR_ANON_KEY]
SUPABASE_SERVICE_ROLE_KEY=[YOUR_SERVICE_ROLE_KEY]

# Stripe (TEST MODE only)
STRIPE_SECRET_KEY=sk_test_[YOUR_KEY]
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_[YOUR_KEY]
STRIPE_WEBHOOK_SECRET=whsec_[YOUR_SECRET]

# Voiceflow
VOICEFLOW_API_KEY=[YOUR_VOICEFLOW_DIALOG_API_KEY]
VOICEFLOW_PROJECT_ID=[YOUR_VOICEFLOW_PROJECT_ID]
VOICEFLOW_VERSION_ID=production

# Demo flags
MOCK_CHAT=true          # returns canned responses, no Voiceflow call
ENABLE_DEV_TOOLS=true   # enables /api/dev/* routes

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Accounts you need

| Service | What for | Where |
|---|---|---|
| Supabase | Auth + Postgres | supabase.com |
| Stripe | Test-mode payments | dashboard.stripe.com |
| Voiceflow | Chatbot (optional if MOCK_CHAT=true) | voiceflow.com |

---

## Running locally

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env.local
# Fill in Supabase and Stripe keys. Set MOCK_CHAT=true and ENABLE_DEV_TOOLS=true for demo.

# 3. Run the Supabase migration
# Option A: paste supabase/migrations/001_initial.sql into the Supabase SQL editor
# Option B: if using Supabase CLI: supabase db push

# 4. (Optional) Seed a demo user
npm run seed

# 5. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Testing Stripe webhooks locally

Install the Stripe CLI: https://stripe.com/docs/stripe-cli

```bash
# In a second terminal, forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# The CLI will print a webhook signing secret — paste it into .env.local as STRIPE_WEBHOOK_SECRET
```

Test card: `4242 4242 4242 4242` — any future expiry, any CVC.

---

## Deploying to Vercel

```bash
# 1. Push to GitHub
# 2. Import the repo in vercel.com/new
# 3. Add all env vars from .env.local in Vercel's project settings
# 4. Set NEXT_PUBLIC_APP_URL to your production URL (e.g. https://concierge.carsoup.com)
# 5. In Stripe dashboard, add a production webhook endpoint:
#    URL: https://your-domain.com/api/webhooks/stripe
#    Events: checkout.session.completed
# 6. Update STRIPE_WEBHOOK_SECRET to the production webhook secret
```

---

## Running the demo (happy path)

This is the exact click sequence for a live demo:

### 1. Sign up free
- Visit http://localhost:3000
- Click **Start Free — No Credit Card**
- Create an account with any email/password
- Confirm email (check inbox, or use Supabase to auto-confirm in Settings > Auth > Email)

### 2. Use the chatbot
- After confirming email, land on `/app`
- Click **Start Conversation** in the AI assistant
- Ask a question about car buying
- *(MOCK_CHAT=true returns instant canned responses — no Voiceflow needed)*

### 3. Buy Advisor (test card)
- Click **See Upgrade Options** or visit `/#pricing`
- Click **Get Advisor**
- On Stripe Checkout: use card `4242 4242 4242 4242`, any expiry, any CVC
- On success, return to `/app` — shows "Advisor — 60 days left"

> **If webhooks aren't working:** Use the simulate-payment safety net:
> ```bash
> curl -X POST http://localhost:3000/api/dev/simulate-payment \
>   -H "Content-Type: application/json" \
>   -d '{"user_id":"[YOUR_USER_ID]","type":"new","tier":"advisor"}'
> ```
> Get your user_id from Supabase Auth dashboard, or from the browser console after login.

### 4. Upgrade to Personal Shopper
- On the `/app` dashboard, click **Upgrade — $400**
- Stripe Checkout: test card again
- On success, return to `/app` — shows "Personal Shopper — same expiry date"

> **Simulate upgrade without Stripe:**
> ```bash
> curl -X POST http://localhost:3000/api/dev/simulate-payment \
>   -H "Content-Type: application/json" \
>   -d '{"user_id":"[USER_ID]","type":"upgrade","engagement_id":"[ENGAGEMENT_ID]"}'
> ```

### Demo user (pre-seeded)
Run `npm run seed` to create:
- Email: `demo@carsoup.com`
- Password: `demo1234!`
- Active Advisor engagement (60 days)
- Ready for immediate upgrade demo

---

## Placeholders to fill before launch

| Placeholder | File | What to do |
|---|---|---|
| `[VOICEFLOW_PROJECT_ID]` | `.env.local` | Voiceflow dashboard → Project settings |
| `[VOICEFLOW_API_KEY]` | `.env.local` | Voiceflow dashboard → API keys |
| `[EBOOK URL/PATH]` | `components/app/EbookSection.tsx` | Drop PDF at `public/ebook.pdf` |
| `[LOGO PATH]` | `components/marketing/Nav.tsx` | Add `public/carsoup-logo.png`, update `<Image>` |
| `concierge@carsoup.com` | `components/marketing/Footer.tsx` | Confirm email address |
| `og-image.png` | `public/og-image.png` | Add 1200×630 OG image |
| Refund policy | `components/marketing/FAQ.tsx` | Finalize copy before launch |

---

## TODOs (POC cuts — clearly marked in code)

- **Google OAuth**: marked TODO in `LoginForm.tsx` and `SignupForm.tsx`
- **Payment-before-signup**: marked TODO in webhook handler
- **Webhook idempotency hardening**: basic guard in place; TODO for full hardening
- **Expired-engagement upgrade race**: TODO comment in webhook handler
- **Refund/cancellation flows**: not built; TODO in FAQ copy
- **Email notifications**: no email on purchase/upgrade (future: Resend or Supabase Edge Functions)

---

## Data model

```sql
engagements
  id              uuid PK
  user_id         uuid FK → auth.users
  tier            text ('advisor' | 'personal_shopper')
  stripe_payment_id text UNIQUE  -- idempotency guard
  purchased_at    timestamptz
  expires_at      timestamptz    -- purchased_at + 60 days
  vehicle_note    text nullable
  created_at      timestamptz
```

- One row per vehicle purchase. Never overwrite — always insert.
- "Active" = `expires_at > now()`.
- Upgrade mutates the existing row (tier only; expires_at unchanged).
- Free access is account-based; no engagement row needed.
