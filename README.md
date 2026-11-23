# Recently viewed products for Shopify Dawn

This repository contains a Dawn theme example that remembers up to five recently viewed products in the visitor's browser and displays them on a product page.

## Free check for sold-out sizes

[Check your Shopify product CSV](https://recently-viewed-products.fly.dev/shopify-variant-audit?locale=en#audit-form-heading). If you stock at multiple locations, include your Shopify inventory export too. The files are processed in your browser.

The sample shows a potential alternative for EU 42 and another size to review for restocking. Download the CSV action plan to see the exact variants and SKUs. [Open the footwear sample](https://recently-viewed-products.fly.dev/shopify-variant-audit?locale=en&example=footwear#audit-result-heading)

If your collection shows sold-out shoe sizes, compare the selected size with and without Shopify's In stock filter. The guide walks through an example in US sizes and builds both comparison links. [Shopify shoe-size filter guide](https://recently-viewed-products.fly.dev/shopify-shoe-size-filter)

[Watch the 29-second example of exact-size recovery](https://recently-viewed-products.fly.dev/shopify-sold-out-despite-stock?locale=en&ref=github#find-size-replacement). The video uses a sample catalog.

In this fictional storefront, an approved US 9 is offered when EU 42 sells out. Try EU 43 to see what happens when the shop has no approved pair. [Try the approved size demo](https://recently-viewed-products.fly.dev/shopify-approved-footwear-demo?locale=en&ref=github)

Use recent sales and inventory to spot variants with up to 14 estimated days of stock. [Set up the Shopify Flow inventory check](shopify-flow-days-of-inventory-remaining.md).

When a variant sells out, Shopify Flow can look up the exact replacement variants you approved in RVI. [Download the workflow with variant IDs](https://github.com/JoGro-code/shopify-recently-viewed/releases/tag/rvi-flow-replacement-variant-ids-v2) or [the status-only workflow](https://github.com/JoGro-code/shopify-recently-viewed/releases/tag/rvi-flow-variant-replacement-v1).

The RVI product-history gallery is free. Basic adds a guest wishlist with exact variants, sharing by link, WhatsApp or email, and same-size alternatives for sold-out variants. Approve a replacement pair and enable the shared-wishlist setting so recipients can check whether an approved replacement for a sold-out variant is orderable in their market. Basic costs US$2.49 every 30 days and has a seven-day free trial. [Try the guest wishlist](https://recently-viewed-products.fly.dev/?locale=en&demo=wishlist#size-demo) · [Install RVI from Shopify](https://apps.shopify.com/recently-viewed-products-7?locale=en&utm_source=github&utm_medium=referral&utm_campaign=rvi_relaunch_202611&utm_content=dawn_readme)

In the RVI admin, open **Size searches with no results** from the Basic **AI stockout worklist**. Paste Shopify report rows as `term,count` after removing personal details. RVI puts the highest counts first and can check exact quotes in a reply from your approved AI tool. After you confirm the match, RVI links the exact original or a previously approved replacement when Shopify confirms it is orderable in the chosen country. RVI also checks Shopify’s catalog price against any supported price cap in the search. [Try both price limits](https://recently-viewed-products.fly.dev/variant-recovery-setup?locale=en&ref=search-audit#search-audit).

## Ausverkaufte Größen kostenlos prüfen

[Eigene Shopify-Produkt-CSV prüfen](https://recently-viewed-products.fly.dev/shopify-variant-audit?locale=de#audit-form-heading). Ergänze bei mehreren Lagerstandorten den Shopify-Bestandsexport. Die Dateien werden im Browser verarbeitet.

Das Beispiel zeigt eine mögliche Alternative für EU 42 und eine Größe zur Nachbestellprüfung. Der CSV-Aktionsplan enthält die genauen Varianten und SKUs. [Schuhbeispiel öffnen](https://recently-viewed-products.fly.dev/shopify-variant-audit?locale=de&example=footwear#audit-result-heading)

Im fiktiven Shop erscheint die freigegebene US 9 als Ersatz für eine ausverkaufte EU 42. Wähle EU 43, um den Fall ohne freigegebenes Paar zu prüfen. [Demo für freigegebene Größenpaare](https://recently-viewed-products.fly.dev/shopify-approved-footwear-demo?locale=de&ref=github)

Markiere Varianten mit bis zu 14 geschätzten Bestandstagen anhand von Verkaufstempo und Bestand. [Shopify-Flow-Bestandscheck einrichten (Englisch)](shopify-flow-days-of-inventory-remaining.md).

Shopify Flow kann bei einer ausverkauften Variante die genauen Ersatzvarianten abrufen, die du in RVI freigegeben hast. [Workflow mit Varianten-IDs herunterladen](https://github.com/JoGro-code/shopify-recently-viewed/releases/tag/rvi-flow-replacement-variant-ids-v2) oder [nur den Freigabestatus prüfen](https://github.com/JoGro-code/shopify-recently-viewed/releases/tag/rvi-flow-variant-replacement-v1).

Die RVI-Produktverlaufsgalerie ist kostenlos. Basic ergänzt die Gast-Merkliste für exakte Varianten, das Teilen per Link, WhatsApp oder E-Mail und passende Alternativen für ausverkaufte Größen. Gib ein Ersatzpaar frei und aktiviere die Prüfung für geteilte Merklisten. Empfänger können dann bei einer ausverkauften Variante prüfen, ob der freigegebene Ersatz in ihrem Markt bestellbar ist. Basic kostet 2,49 USD je 30 Tage und bietet sieben kostenlose Testtage. [Gast-Merkliste ausprobieren](https://recently-viewed-products.fly.dev/?locale=de&demo=wishlist#size-demo) · [RVI über Shopify installieren](https://apps.shopify.com/recently-viewed-products-7?locale=de&utm_source=github&utm_medium=referral&utm_campaign=rvi_relaunch_202611&utm_content=dawn_readme)

Öffne im RVI-Admin über die **KI-Arbeitsliste** von Basic den Bereich **Größensuchen ohne Ergebnis**. Entferne personenbezogene Angaben und füge Suchbegriffe und Anzahlen aus dem Shopify-Bericht als `term,count` ein. RVI sortiert nach Häufigkeit und kann wörtliche Zitate aus der Antwort deines freigegebenen KI-Tools prüfen. Bestätige die Übereinstimmung. RVI verlinkt die genaue Originalvariante oder einen bereits freigegebenen Ersatz, wenn Shopify die Bestellbarkeit im gewählten Land bestätigt. Eine unterstützte Preisgrenze aus der Suche gleicht RVI mit dem Shopify-Katalogpreis ab. [Beide Preisgrenzen ausprobieren](https://recently-viewed-products.fly.dev/variant-recovery-setup?locale=de&ref=search-audit#search-audit).

## Preview the Dawn theme example

Use an unpublished copy of Dawn. The example uses `localStorage`, the shop's Shopify Ajax product routes and EUR price formatting. The section expects Dawn's `component-card.css`, `component-price.css`, and `section-related-products.css`. Its optional blob and arch image shapes also depend on `mask-blobs.css` and the `mask-arch` snippet respectively.

1. Add [the JavaScript file](Assets/recently-viewed.js) as `assets/recently-viewed.js` and [the section](Sections/recently-viewed-products.liquid) as `sections/recently-viewed-products.liquid` in the test theme.
2. Load the asset in `layout/theme.liquid` before `</head>` using `<script src="{{ 'recently-viewed.js' | asset_url }}" defer></script>`.
3. Use [the sample product template](Templates/product.json) as a reference. Add an entry of type `recently-viewed-products` to the `sections` object in your existing product JSON template and add that entry's key to the template's `order` array.
4. Open published product pages in the unpublished theme preview and check that the section displays your recent products.

In **Try the guest wishlist** above, open the ready-made shared sample to see the recipient view. To try sharing, choose EU 42 and EU 43 of the sample shoe and click **Save this size** for each. Select **Share the sample wishlist**, then **Open the recipient view** to check that both sizes appear.

Öffne oben unter **Gast-Merkliste ausprobieren** die vorbereitete Beispiel-Merkliste, um die Empfängeransicht zu sehen. Wenn du das Teilen ausprobieren möchtest, wähle EU 42 und EU 43 des Beispielschuhs und klicke jeweils auf **Diese Größe merken**. Klicke auf **Beispiel-Merkliste teilen** und dann auf **Empfängeransicht öffnen**, um beide Größen zu prüfen.
