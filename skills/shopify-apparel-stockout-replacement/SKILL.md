---
name: shopify-apparel-stockout-replacement
description: Help a Shopify merchant check a sold-out clothing variant for a currently orderable alternative of the same model, size and fit in the buyer’s country.
---

# Check a sold-out clothing variant

Use the merchant’s public Shopify product URL for the exact sold-out variant and the buyer country. Ask for the country if it is missing. The supported buyer countries are `PL`, `GB`, `US`, `DE`, `FR` and `ES`. Choose the guide language from `en`, `de`, `fr` and `es`, using `en` when the language is unspecified. The guide language and buyer country are independent.

## Prepare the link

1. Accept a public HTTPS Shopify product URL with exactly one `variant` parameter containing a positive decimal ID. Keep the ID as text. Keep the storefront hostname and full product path, including its market or language prefix. Retain only `variant` in the query and remove any fragment. If the URL contains credentials uses a `shopifypreview.com` hostname, or requires a password, preview, checkout or customer session, ask for the public product link.
2. Use `https://recently-viewed-products.fly.dev/shopify-apparel-size-replacement?locale=en&ref=agent-skill` with the selected guide language. When both inputs are valid, append `#apparel-market-form?` followed by `new URLSearchParams({ country, source }).toString()`. Use the canonical public product URL as `source`. Encode it once through `URLSearchParams`.
3. If the exact public variant link or supported buyer country is missing, share the same entry link without a fragment and ask for the missing input.

## Check the replacement

Open the link with the merchant and have them start the Shopify catalog check. The link only prepares the fields. A candidate must be the same model from the same vendor, with the same complete size and fit options in the selected buyer country. Check each named fit option separately, such as waist and inseam or size and length. Have the merchant select a candidate so RVI can verify current orderability for that exact variant. If no candidate qualifies, leave the result unresolved or let the merchant provide a public product link for another colour of the same model, without a variant selection, for the same check.

Report only what the check confirms. The merchant explicitly approves the fit before taking the prepared pair into RVI Free. The merchant separately reviews Shopify permissions and confirms any installation on Shopify’s native screen. Keep this workflow read-only in the merchant’s shop and leave orders, themes, product data and saved offers untouched.
