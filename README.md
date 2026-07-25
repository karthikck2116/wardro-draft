# Wardro headless storefront

Production-minded Next.js storefront for **Wardro — More Space. Less Chaos.** It runs with typed mock data until Shopify is enabled.

## Implementation plan

1. Establish design tokens, responsive shell, header/footer, and typed commerce models.
2. Build the reference-led homepage with original lifestyle imagery and reusable merchandising sections.
3. Add URL-backed collection filtering, sorting, product cards, and responsive filter UI.
4. Add product gallery, variant/accessory selection, PIN-code eligibility, dynamic totals, and local cart.
5. Add cart, preferred installation date, mock checkout notice, content/support/account shells.
6. Keep all Shopify access server-side behind a repository and typed GraphQL client; complete Cart API wiring when credentials are supplied.
7. Verify types, tests, accessibility, responsive layouts, and deployment docs.

## Run locally

```bash
npm install
copy .env.example .env.local
npm run dev
```

Visit `http://localhost:3000`. Development PIN codes include `560001`, `560034`, and `560102`; this list is intentionally not production-ready.

## Architecture

- App Router and Server Components by default
- Mock/Shopify repository boundary in `lib/commerce`
- Private Storefront token read only in server-only modules
- Local guest cart and wishlist for mock mode
- Shopify checkout remains the payment surface in connected mode

See `docs/` for Shopify configuration and content/deployment guidance.
