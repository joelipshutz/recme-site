# rec.me website

The marketing site for [rec.me](https://getrec.me), a social map for remembering places worth returning to and discovering places through people you trust.

## Development

```sh
python3 -m http.server 4173
```

The site is deliberately dependency-free. Production is deployed to Vercel
from `main`. Keep the Vercel Framework Preset set to `Other`; selecting Next.js
causes Vercel to run `next build` even though this site has no Node dependencies.
