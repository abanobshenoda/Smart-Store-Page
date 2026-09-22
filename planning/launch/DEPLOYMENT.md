# Deployment Guide - Vercel

## Step-by-Step: Deploy Smart Store to Vercel

---

## 1. Prerequisites

- [ ] GitHub account (https://github.com)
- [ ] Vercel account (https://vercel.com) - Free
- [ ] Neon DB created (https://neon.tech) - Free
- [ ] Custom domain (optional)

---

## 2. Push Code to GitHub

```bash
# 1. Initialize git in project folder
git init

# 2. Create .gitignore
# Make sure node_modules, .next, .env.local are ignored

# 3. Stage all files
git add .

# 4. First commit
git commit -m "Initial commit: Smart Store planning phase"

# 5. Create repo on GitHub and push
git remote add origin https://github.com/YOUR_USERNAME/smart-store.git
git branch -M main
git push -u origin main
```

---

## 3. Deploy to Vercel

### Method 1: Web Dashboard
1. Go to https://vercel.com/dashboard
2. Click **"Add New"** → **"Project"**
3. Click **"Import"** on your GitHub repo
4. Vercel auto-detects Next.js

### Method 2: CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 4. Configure Environment Variables in Vercel

In Vercel Dashboard → Project → **Settings** → **Environment Variables**:

### Production Variables

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Your Neon connection string |
| `DATABASE_URL_UNPOOLED` | Your Neon direct string |
| `NEXTAUTH_URL` | https://yourdomain.com |
| `NEXTAUTH_SECRET` | Generated secret |
| `STRIPE_SECRET_KEY` | Your live Stripe key |
| `STRIPE_PUBLISHABLE_KEY` | Your live publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret |
| `RESEND_API_KEY` | Resend API key |
| `UPLOADTHING_SECRET` | UploadThing secret |
| `UPLOADTHING_APP_ID` | UploadThing app ID |
| `NEXT_PUBLIC_APP_URL` | https://yourdomain.com |
| `NEXT_PUBLIC_ANALYTICS_ID` | GA4 ID |

**IMPORTANT**: 
- Add these for **Production** AND **Preview** environments
- Never put real keys in git

---

## 5. Custom Domain

1. Vercel Dashboard → Project → **Settings** → **Domains**
2. Add your domain (e.g., smartstore.eg)
3. Update DNS records at your registrar:
   - `A` record → `76.76.21.21` (for apex)
   - `CNAME` → `cname.vercel-dns.com` (for www)
4. Vercel automatically provisions SSL (HTTPS)

### Arabic TLD (.eg)
```bash
# Some .eg registrars require hosting in Egypt
# Use international TLD (.com) if .eg is difficult
# Or use Egypt-registered provider
```

---

## 6. Database Setup on Vercel

Neon works perfectly with serverless (Vercel):
- Neon = serverless PostgreSQL (no fixed server)
- Many concurrent connections supported
- Auto-scales

---

## 7. After Deployment

### Setup Webhooks
1. **Stripe Webhook**:
   - Dashboard → Webhooks → Add endpoint
   - URL: `https://yourdomain.com/api/webhooks/stripe`
   - Events: checkout.session.completed, payment_intent.succeeded, etc.

### Configure Callback URLs
- **NextAuth**:
  - Set `NEXTAUTH_URL` to production URL
  - Add Google OAuth redirect URL in Google Console

### Enable Production
1. Vercel → Project → **Redeploy** (if needed)
2. Check deployment logs
3. Visit `https://yourdomain.com`

---

## 8. Environment Strategy

### Branches
| Branch | Deployment URL |
|--------|----------------|
| `main` | production (yourdomain.com) |
| `staging` | staging.vercel.app |
| feature/* | preview.vercel.app |

```bash
# Deploy staging
git checkout -b staging
vercel --prod
```

---

## 9. Continuous Deployment

Vercel auto-deploys on every push to `main`:
```bash
# Push to main = deploy to production
git add .
git commit -m "Update"
git push origin main
```

---

## 10. Common Issues & Fixes

### Issue: Build fails on Vercel but works locally
- Clear `.next` cache: delete `.next` folder, push again
- Check environment variables are set in Vercel
- Check `npm install` succeeds

### Issue: Database connection timeout
- Use `DATABASE_URL_UNPOOLED` for migrations/scripts
- Neon handles pooling automatically on Vercel

### Issue: Images not loading
- Vercel blocks some hosts; configure `remotePatterns` in `next.config.js`

### Issue: SSR wrong
- Make sure 3D components use `ssr: false` (client only)

---

## 11. Monitoring

- **Vercel Analytics** (free): traffic, performance
- **Vercel Logs**: errors, requests
- **Neon Dashboard**: DB usage, connections

---

## Quick Deploy Check

```bash
# Local production build test
npm run build

# Should output:
# ✓ Compiled successfully
# ✓ Generated static pages
# ✓ Route (app) exported
```
