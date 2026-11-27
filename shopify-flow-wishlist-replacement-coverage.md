# Check replacement coverage for low-stock wishlist items

If your shop already uses Hulk AI Wishlist & Favorites with its Shopify Flow integration, you can use a low-stock saved item to check whether an approved replacement already exists in RVI. This recipe pairs two documented Flow steps. Verify the variable and output in your own Shopify Flow draft before turning it on. [Hulk Flow integration](https://support.hulkthemes.com/support/solutions/articles/19000171534-integrating-hulk-advanced-wishlist-with-shopify-flow)

## Prepare one replacement

In RVI Free, approve one exact replacement in one buyer country. Use the public size check to verify an existing sold-out size and a candidate with the same fit, then keep the pair code for Free Setup. [Check an exact clothing size](https://recently-viewed-products.fly.dev/shopify-apparel-size-replacement?locale=en&ref=github) · [Install RVI Free](https://recently-viewed-products.fly.dev/go/shopify/en-dawn-free-size-offer)

## Check the saved variant in Shopify Flow

1. In a new draft, choose Hulk’s **Wishlisted product is low in stock** trigger. Use a paid Hulk plan with the Flow integration enabled. [Hulk plan details](https://apps.shopify.com/my-wishlist-share-remind#pricing)
2. Add RVI’s **Check approved replacement** action. In **Source variant ID**, select **Variant ID** from the Hulk trigger using Flow’s variable picker. Preview the value as text. The RVI action accepts the exact decimal variant ID as text or a Shopify ProductVariant GID. Preserve all digits. In **Buyer country for RVI Free**, enter the two-letter country code used for the approved pair, for example `GB`.
3. Add **Log output** and select the RVI result’s **status** using the variable picker. The steps use the variant ID and buyer country for the check. Include only the result and, if useful, the variant ID in the internal log. [Shopify Flow Log output](https://help.shopify.com/en/manual/shopify-flow/reference/actions/log-output)
4. Check the draft with an exact test variant before enabling it. Review whether the trigger supplies the ID and whether Flow can preview the app step. The table shows what to look for when the app action runs. [Test a Shopify Flow workflow](https://help.shopify.com/en/manual/shopify-flow/manage/test-workflow)

| Result | Meaning |
| --- | --- |
| `APPROVED_PAIR` | RVI has a saved approval for the exact original variant and Free buyer country. When the original sells out, confirm the replacement is orderable for that buyer country in the public size check before offering it. |
| `NO_APPROVED_PAIR` | The check found no saved approval for the given variant in that buyer country. Review the variant and the country used in the draft. |
| `UNVERIFIED` | Recheck the selected variable, buyer country and RVI installation before using the result. |

The RVI action results have been tested separately. A live run with the Hulk trigger and RVI action together still needs validation in a shop using both apps.
