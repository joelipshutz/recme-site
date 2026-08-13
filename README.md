# rec.me website

The public website and Universal Link fallback for rec.me.

## Local development

```bash
pnpm install
pnpm dev
```

Copy `.env.example` to `.env.local` to enable live public previews. The site
renders privacy-safe fallback pages when Supabase is unavailable.

## Production

Vercel owns the production deployment. `getrec.me` and `www.getrec.me` should
point at the Vercel project after a production build passes.

The primary download CTA defaults to TestFlight. For the public App Store
launch, set `NEXT_PUBLIC_RECME_RELEASE_CHANNEL=app-store` in the Vercel
Production environment and redeploy. The only accepted App Store value is
`app-store`; missing or unexpected values fail safely back to TestFlight.

See [`docs/launch-dns-and-site.md`](docs/launch-dns-and-site.md) for the verified
DNS baseline, Clerk production handoff, support-email setup, and launch checks.
