---
name: shopify-dawn-recently-viewed
description: Guide Shopify merchants through testing RVI’s Free Gallery or one approved replacement for a sold-out shoe size in an unpublished Dawn theme.
---

# Set up RVI in a Dawn draft

Use Shopify access already granted for the task. If Shopify Admin is unavailable, guide the merchant through the same steps and ask what they see after each check. The merchant reviews Shopify permissions, confirms installation, saves offers and saves changes to the draft theme.

## Test one free replacement for a sold-out shoe size

Use this path when the merchant wants to offer an immediately orderable alternative for one shoe size in one buyer country. For a US buyer, the merchant can open the [public US size check](https://recently-viewed-products.fly.dev/shopify-footwear-fit-check?locale=en&ref=restock-us&via=product-start#footwear-pair) with their own public Shopify product link. They select the exact sold-out variant, choose **Find replacements in Shopify** or enter an exact replacement link, then verify the exact pair. Have them review suitability and fit, confirm the pair and choose **Download the pair (.txt)**.

1. If the merchant chooses to install RVI, open the Shopify App Store listing in [English](https://recently-viewed-products.fly.dev/go/shopify/en-dawn-free-size-offer), [German](https://recently-viewed-products.fly.dev/go/shopify/de-dawn-free-size-offer) or [French](https://recently-viewed-products.fly.dev/go/shopify/fr-dawn-free-size-offer). Have the merchant confirm installation in Shopify and use the Free plan.
2. In English RVI Setup, open **Set up a free size replacement** and expand **Fill fields from a prepared pair**. Choose **Import one prepared pair (.txt or .json)** for a downloaded pair file or a JSON file containing one eligible n8n result from the same Shopify store. To paste, use **Prepared pair code or n8n result** and choose **Use this pair**. The merchant can also select both exact variants and one buyer country manually. Have them review the variants and market, approve the fit and choose **Verify and save offer**. If they use a private storefront that Shopify cannot verify publicly, they can select **Prepare for a stockout** and test the pair in the draft.
3. In the unpublished theme, add **RVI shoe alternative** to the product templates for both variants. Add it once if the products share a template. In the preview, select the saved buyer country and open the exact sold-out variant. Choose **Check the shoe alternative** and verify that the linked destination is the approved orderable variant. Check a sold-out size without an approved pair and confirm that it shows no offer.

Report which installation, save and preview checks the merchant confirmed. Keep the theme unpublished.

## Set up the Free Gallery

Choose links in the merchant’s language.

| Language | Dawn walkthrough | Free plan in Shopify |
| --- | --- | --- |
| English | [Watch the 68-second guide](https://recently-viewed-products.fly.dev/watch-shopify-dawn-recently-viewed?locale=en) | [View the Free plan](https://recently-viewed-products.fly.dev/go/shopify/en-dawn-gallery-video) |
| Deutsch | [Dawn-Anleitung ansehen](https://recently-viewed-products.fly.dev/watch-shopify-dawn-recently-viewed?locale=de) | [Gratis-Tarif ansehen](https://recently-viewed-products.fly.dev/go/shopify/de-dawn-gallery-video) |
| Français | [Voir le guide Dawn](https://recently-viewed-products.fly.dev/watch-shopify-dawn-recently-viewed?locale=fr) | [Voir le forfait gratuit](https://recently-viewed-products.fly.dev/go/shopify/fr-dawn-gallery-video) |

## Set up the draft

1. In Shopify, choose the Free Gallery plan and complete the installation.
2. Open **Online Store → Themes**. Open the theme editor for an unpublished copy of Dawn. Duplicate Dawn first if the merchant only has a published copy.
3. Open the product template used by the products to test. Add the **Recently viewed products** app block and save the draft.

## Test two products in the preview

1. Open the draft preview. Use the same browser and storefront market throughout the test. Allow storefront preferences if Shopify asks.
2. Open a product, then a second product that uses the same template.
3. Confirm that the first product appears in the gallery on the second page. Open its link and check that it returns to the first product.

Report **Configured in the draft** when the merchant or the theme editor confirms the block was saved. Report **Seen in the draft preview** when the test above actually shows the first product and its link works. If the preview check is pending, say which step remains. Keep the test in the unpublished theme.
