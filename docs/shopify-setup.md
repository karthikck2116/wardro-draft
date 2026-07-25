# Shopify setup

1. Create or open the Shopify store and install the **Headless** sales channel.
2. Create a storefront in that channel and generate Storefront API credentials.
3. Publish every sellable product and accessory to the Headless channel.
4. Create the collections listed in `docs/collections.md` and the definitions in `docs/metafields.md`.
5. Make required metafield definitions accessible through the Storefront API.
6. Copy `.env.example` to `.env.local`, add the store domain/private Storefront token, then set `NEXT_PUBLIC_ENABLE_SHOPIFY=true`.
7. In Shopify Settings, configure cards, UPI, net banking, wallets, supported EMI, and eligibility-based COD. Do not build a separate payment page.
8. Configure shipping for Bengaluru and replace the development PIN-code list with the operational source of truth. Installation is delivered through approved third-party partners.
9. Test products, variant availability, accessory cart lines, attributes, discounts, and the returned Shopify `checkoutUrl` in a development store.
10. Configure the custom domain and its canonical URL, then add the same environment values to Vercel and deploy.

Never expose the private Storefront token via a `NEXT_PUBLIC_` variable.
