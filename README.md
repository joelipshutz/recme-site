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
