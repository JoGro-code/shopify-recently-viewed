# Recently viewed products for Shopify Dawn

This repository contains a Dawn theme example that remembers up to five recently viewed products in the visitor's browser and displays them on a product page.

## Free check for sold-out sizes

Open the [Shopify size audit](https://recently-viewed-products.fly.dev/shopify-variant-audit?locale=en) and select **Try example data**. The sample shows a potential alternative for EU 42 and a size to review for restocking. You can also check your own Shopify product and inventory CSV exports. The check runs in your browser without uploading the files or signing in.

To offer orderable alternatives in the same size when a shopper returns to a sold-out selection, see [RVI in the Shopify App Store](https://apps.shopify.com/recently-viewed-products-7?locale=en&utm_source=github&utm_medium=referral&utm_campaign=rvi_relaunch_202611&utm_content=dawn_readme). The product-history gallery is free. Basic includes same-size alternatives and costs US$2.49 every 30 days, with a seven-day free trial.

## Ausverkaufte Größen kostenlos prüfen

Öffne den [Shopify-Größencheck](https://recently-viewed-products.fly.dev/shopify-variant-audit?locale=de) und wähle **Beispieldaten prüfen**. Du siehst eine mögliche Alternative für EU 42 und eine Größe zur Nachbestellprüfung. Eigene Shopify-Produkt- und Bestandsdateien kannst du direkt im Browser prüfen. Die Dateien bleiben auf deinem Gerät. Eine Anmeldung ist nicht erforderlich.

[RVI im Shopify App Store](https://apps.shopify.com/recently-viewed-products-7?locale=de&utm_source=github&utm_medium=referral&utm_campaign=rvi_relaunch_202611&utm_content=dawn_readme) bietet eine kostenlose Produktverlauf-Galerie. Basic ergänzt bestellbare Alternativen in derselben Größe und kostet 2,49 USD je 30 Tage mit sieben kostenlosen Testtagen.

## Preview the Dawn theme example

Use an unpublished copy of Dawn. The example uses `localStorage`, the shop's Shopify Ajax product routes and EUR price formatting. The section expects Dawn's `component-card.css`, `component-price.css`, and `section-related-products.css`. Its optional blob and arch image shapes also depend on `mask-blobs.css` and the `mask-arch` snippet respectively.

1. Add [the JavaScript file](Assets/recently-viewed.js) as `assets/recently-viewed.js` and [the section](Sections/recently-viewed-products.liquid) as `sections/recently-viewed-products.liquid` in the test theme.
2. Load the asset in `layout/theme.liquid` before `</head>` using `<script src="{{ 'recently-viewed.js' | asset_url }}" defer></script>`.
3. Use [the sample product template](Templates/product.json) as a reference. Add an entry of type `recently-viewed-products` to the `sections` object in your existing product JSON template and add that entry's key to the template's `order` array.
4. Open published product pages in the unpublished theme preview and check that the section displays your recent products.
