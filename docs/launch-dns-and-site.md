# getrec.me DNS and site launch handoff

Verified on August 13, 2026. DNS is managed in Squarespace and the website is
hosted by the Vercel project `recme-site`.

## Do not change these working website records

| Purpose | Type | Host | Value |
| --- | --- | --- | --- |
| Apex website | A | `@` | `216.198.79.1` |
| `www` website | CNAME | `www` | `837c0166c03511d7.vercel-dns-017.com` |

Both `https://getrec.me` and `https://www.getrec.me` currently resolve to the
production Vercel deployment. Keep the apex on Vercel when adding Clerk or mail
records.

## Blocker 1: create the Clerk production instance, then add its exact records

There is no Clerk production instance yet, so Clerk currently returns no DNS
values. Do not invent targets from examples or add placeholder CNAMEs.

1. In an interactive terminal linked to the rec.me Clerk development app, run:

   ```sh
   npx clerk deploy
   ```

2. Choose `getrec.me` as the production domain and clone the development
   settings.
3. Clerk will print the exact required CNAME and email-authentication records.
   In Squarespace, open Domains → `getrec.me` → DNS → Add record and enter those
   values exactly. Common labels such as `clerk` or `accounts` are not a
   substitute for the values Clerk generates.
4. Do not edit the working `@` A record or `www` CNAME.
5. Verify DNS, SSL, and Clerk email records with:

   ```sh
   npx clerk deploy status --wait
   ```

6. In Clerk production, restrict the allowed subdomains to the surfaces rec.me
   actually uses. Register the native iOS app with:

   - App ID Prefix / Team ID: `Y7TVK75RZ8`
   - Bundle ID: `com.grayline.wander`

7. Configure production Apple and Google OAuth credentials, production
   webhooks, and the production `pk_live_` / `sk_live_` keys before building the
   release candidate. Update the iOS Associated Domains entitlement to the
   production Clerk frontend API host that Clerk generates.

## Blocker 2: make support@getrec.me a real mailbox

Public DNS currently has no MX record. `support@getrec.me` therefore cannot
receive mail even though the website and App Store package use it. The domain
also publishes `v=spf1 -all`, which explicitly authorizes no outbound sender.
DMARC is already strict: `v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s`.

Recommended setup: provision Google Workspace for `getrec.me`, create
`support@getrec.me`, and use Squarespace's **Google Workspace MX** preset. If
adding the record manually, Google currently specifies:

| Purpose | Type | Host | Priority | Value |
| --- | --- | --- | --- | --- |
| Google Workspace inbound mail | MX | `@` | `1` | `smtp.google.com` |

Complete Google's domain verification, SPF, and DKIM steps using the exact
values Google Admin generates. Replace the current `v=spf1 -all` record with
Google's generated SPF value; keep only one SPF TXT record at the apex. Keep
the existing DMARC record unless Google Admin identifies a conflict.

Before App Store submission:

- Send a message from an unrelated mailbox to `support@getrec.me` and confirm
  it arrives.
- Reply from `support@getrec.me` and confirm SPF, DKIM, and DMARC pass in the
  received-message headers.
- Confirm the App Store support URL is `https://getrec.me/support` and the
  privacy URL is `https://getrec.me/privacy`.

## Site release switch

The website defaults to TestFlight until the public App Store listing is live.
After Apple makes version 1.0 available, set the Vercel Production environment
variable below and redeploy:

```text
NEXT_PUBLIC_RECME_RELEASE_CHANNEL=app-store
```

Then verify every header, hero, footer, shared-profile, shared-place, shared-list,
and invite CTA resolves to `https://apps.apple.com/app/id6776850787`. To roll
back, set the value to `testflight` (or remove it) and redeploy.

## Final public checks

- `https://getrec.me`, `https://www.getrec.me`, `/support`, `/privacy`, `/terms`,
  `/community`, `/privacy-choices`, and `/import-help` return 200 over HTTPS.
- `/.well-known/apple-app-site-association` returns JSON without a redirect and
  includes `Y7TVK75RZ8.com.grayline.wander`.
- Clerk production DNS, SSL, native app registration, OAuth, webhooks, and
  associated domains all show complete.
- `support@getrec.me` passes the inbound and authenticated-reply tests above.
- The App Store CTA is switched only after the public listing resolves.
