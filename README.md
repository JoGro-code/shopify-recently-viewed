# Recently viewed products for Shopify Dawn

This repository contains a Dawn theme example that remembers up to five recently viewed products in the visitor's browser and displays them on a product page.

## Set up one free shoe-size replacement

RVI’s Free plan can show one approved replacement for a sold-out shoe size on its product page in one buyer country. In RVI Setup, open **Set up a free size replacement**. Choose the exact sold-out variant or paste its storefront link, then enter the buyer country code. Open **Find replacements in the Shopify catalog**, select **Check catalog** and choose **Use this variant** for a suitable result. Confirm the fit, then select **Verify and save offer**. You can also enter both exact variant links manually or prepare the pair for a future stockout.

If you already checked a pair, paste the code or import the `.txt` file under **Resume a prepared test**. Select **Set up this free size replacement** to review and approve the prefilled variants.

In a draft Shopify theme, add **RVI shoe alternative** to the product templates used by the original and replacement. Add the block once if they share a template. In the selected country, open the sold-out variant and select **Check the shoe alternative**. RVI checks both variants and links to the exact replacement if it can be ordered there.

[Install RVI to set up a free replacement](https://recently-viewed-products.fly.dev/go/shopify/en-dawn-free-size-offer)

**For UK shops.** [Check a sold-out shoe size for UK shoppers](https://recently-viewed-products.fly.dev/shopify-footwear-fit-check?locale=en&ref=restock-gb&via=product-start#footwear-pair). The checker starts in the United Kingdom and shows both catalogue prices in GBP. Review the fit and save the pair file for RVI’s Free setup in a draft theme.

**Deutsch.** Öffne in RVI **Kostenlosen Größenersatz einrichten**. Wähle die genaue ausverkaufte Variante oder füge ihren Shop-Link ein. Gib den Ländercode der Käufer ein. Öffne **Im Shopify-Katalog nach Ersatz suchen**, wähle **Katalog prüfen** und bei einem passenden Ergebnis **Variante übernehmen**. Bestätige die Passform und wähle **Angebot prüfen und speichern**. Mit einem geprüften Paar kannst du unter **Vorbereiteten Test fortsetzen** den Code oder die Datei übernehmen. Prüfe danach beide Varianten und das Käuferland und bestätige die Passform. Setze **RVI-Schuhalternative** im Theme-Entwurf auf die Produktvorlagen beider Artikel. Bei einer gemeinsamen Vorlage genügt ein Block. Prüfe den Ersatz im gewählten Käuferland. [RVI für den kostenlosen Größenersatz installieren](https://recently-viewed-products.fly.dev/go/shopify/de-dawn-free-size-offer)

**Français.** Choisissez **Configurer un remplacement gratuit** dans RVI. Sélectionnez la variante épuisée ou collez son lien exact, puis saisissez le code du pays de l’acheteur. Ouvrez **Chercher un remplacement dans le catalogue Shopify**, cliquez sur **Vérifier le catalogue**, puis sur **Choisir cette variante** pour retenir un résultat. Confirmez le chaussant, puis choisissez **Vérifier et enregistrer l’offre**. Si vous avez vérifié une paire, importez le code ou le fichier sous **Reprendre un test préparé**. Vérifiez les variantes et le pays de l’acheteur, puis confirmez le chaussant. Placez le bloc **Alternative RVI** sur les deux modèles de fiche dans un thème brouillon. Un bloc suffit si les produits partagent le même modèle. Testez le remplacement dans le pays sélectionné. [Installer RVI pour configurer un remplacement gratuit](https://recently-viewed-products.fly.dev/go/shopify/fr-dawn-free-size-offer)

**Español.** Si tu zapatería migró a Shopify desde PrestaShop o WooCommerce, [comprueba los enlaces de talla](https://recently-viewed-products.fly.dev/shopify-variant-link-check?locale=es). Abre la variante en el mercado del cliente y verifica que el carrito de prueba reciba la talla esperada antes de configurar un reemplazo.

### Keep product-page app blocks after a theme change

Use the [Shopify theme app block preflight](theme-app-block-preflight/README.md) in GitHub Actions to check that the required blocks are still present and enabled in both product templates. The check reads the theme checkout without connecting to Shopify.

## Set up the Free Gallery

After installation, add **Recently viewed products** to your product template and save it in Shopify’s theme editor. Open two products that use the same template in one browser. Allow storefront preferences if Shopify asks. The first product appears in the gallery on the second page.

[Watch the 68-second Dawn setup](https://recently-viewed-products.fly.dev/watch-shopify-dawn-recently-viewed?locale=en) · [Anleitung auf Deutsch](https://recently-viewed-products.fly.dev/watch-shopify-dawn-recently-viewed?locale=de) · [Guide en français](https://recently-viewed-products.fly.dev/watch-shopify-dawn-recently-viewed?locale=fr)

For a homepage gallery, add the block to the homepage and enable **RVI product history** in the same theme. Open any product and then the homepage to test it. [Get the Free Gallery on Shopify](https://recently-viewed-products.fly.dev/go/shopify/en-dawn-free-gallery) · [Kostenlose Galerie im Shopify App Store](https://recently-viewed-products.fly.dev/go/shopify/de-dawn-free-gallery)

Setting this up for a client? Copy the [Dawn client handoff checklist](dawn-gallery-client-handoff.md) and record what the client can verify in the draft preview.

### Follow the setup with an assistant

The optional [Dawn setup skill](skills/shopify-dawn-recently-viewed/SKILL.md) walks through the Free Gallery in a draft theme. Choose the Free plan in Shopify when you’re ready to install RVI.

```sh
npx skills add JoGro-code/shopify-recently-viewed --skill shopify-dawn-recently-viewed
```

### Help shoppers recover from a missing product page

[Try the free 404 gallery](https://recently-viewed-products.fly.dev/shopify-404-recently-viewed?locale=en&ref=github). Visit the sample product, then open the missing product link. The example returns HTTP 404 and links back to the item you just viewed. You can clear the example history and repeat it.

In an unpublished Dawn theme, open **App embeds**, enable **RVI product history** and select **Show the free gallery on 404 pages**. Save the draft. In one storefront preview, open a product and allow storefront preferences if Shopify asks. Then open a missing path such as `/rvi-history-preview-404` in the same market and preview. Confirm the earlier product is visible and its link works before you publish the theme. In RVI, **Setup → RVI browsing history → Test the 404 gallery** builds the missing-page link from one product in the same storefront or theme preview.

**Deutsch.** [Kostenlose Galerie auf einer 404-Seite testen](https://recently-viewed-products.fly.dev/shopify-404-recently-viewed?locale=de&ref=github). Aktiviere im unveröffentlichten Theme den **RVI-Produktverlauf** und **Kostenlose Galerie auf 404-Seiten anzeigen**. Öffne danach ein Produkt und eine fehlende Seite in derselben Vorschau und im selben Markt.

**Français.** [Essayer la galerie gratuite sur une page 404](https://recently-viewed-products.fly.dev/shopify-404-recently-viewed?locale=fr&ref=github). Dans un thème non publié, activez **Historique RVI** et **Afficher la galerie gratuite sur les pages 404**. Ouvrez ensuite une fiche produit et une page manquante dans le même aperçu et le même marché.

### Check the gallery before switching from Dawn to Horizon

Horizon lists its own recently viewed feature. Open a product in the unpublished Horizon preview, then open the search panel to check the theme’s recent items. [Horizon features](https://themes.shopify.com/themes/horizon/presets/horizon) · [Shopify’s search implementation](https://github.com/Shopify/horizon/blob/c531fd5bb8904e7f871c308b15c64a7cb0de8e20/sections/predictive-search.liquid#L108-L121)

For the RVI gallery on a product page, look for **Recently viewed products** under **Apps** in that product template and save it in the Horizon draft. Open two products using that template in the same preview and market. Allow storefront preferences if Shopify asks, then confirm the second page links back to the first product. If the block is missing or the first product never appears, leave that placement unverified. [Shopify’s app block instructions](https://help.shopify.com/en/manual/online-store/themes/customizing-themes/apps#app-blocks)

If the product uses a custom template, check **Theme template** on its Shopify product record. Paste the link to that product in the theme editor into RVI Setup. RVI can open the exact preview and offers the add shortcut when the URL names the product template. After saving, test on two products assigned to that template. [Shopify’s guide to assigning product templates](https://help.shopify.com/en/manual/online-store/themes/theme-structure/templates)

For a missing page, enable **RVI product history** and **Show the free gallery on 404 pages** under **App embeds** in the same draft. Open a product and then a missing page in that preview. Confirm the gallery opens the earlier product. Check the placements you want before publishing. [Try the public 404 example](https://recently-viewed-products.fly.dev/shopify-404-recently-viewed?locale=en&ref=github)

**Deutsch.** Öffne im unveröffentlichten Horizon-Theme ein Produkt und prüfe den Verlauf in der Suche. Prüfe bei einer eigenen Vorlage zuerst die Einstellung **Theme-Vorlage** am Produkt. Füge den Editor-Link in RVI ein und öffne das ausgewählte Produkt. Der direkte Einbau ist verfügbar, wenn der Link die Produktvorlage nennt. Prüfe mit zwei Produkten derselben Vorlage, ob das erste auf der zweiten Seite erscheint. Die 404-Galerie benötigt den RVI-Produktverlauf und die 404-Option im selben Entwurf. Prüfe, ob der Produktlink auf der fehlenden Seite funktioniert. [Öffentliches 404-Beispiel](https://recently-viewed-products.fly.dev/shopify-404-recently-viewed?locale=de&ref=github)

**Français.** Dans l’aperçu Horizon non publié, ouvrez un produit et vérifiez les articles récents dans la recherche. Si le produit utilise un modèle personnalisé, vérifiez d’abord le **Modèle de thème** sur sa fiche dans Shopify. Collez le lien de l’éditeur dans RVI pour ouvrir la fiche exacte. Si le lien précise le modèle de produit, RVI propose le raccourci d’ajout. Ouvrez ensuite deux produits qui utilisent ce modèle. Vérifiez que le premier apparaît sur la seconde fiche. [Préparez le test de la galerie avec deux produits](https://recently-viewed-products.fly.dev/shopify-variant-audit?locale=fr#prepare-gallery). Dans RVI, sélectionnez le brouillon et collez son lien d’aperçu Shopify pour le marchand. Utilisez ensuite le code préparé. Pour la galerie 404, activez l’historique RVI et l’option 404 dans le même brouillon, puis vérifiez le lien du produit sur une page introuvable. [Exemple 404 public](https://recently-viewed-products.fly.dev/shopify-404-recently-viewed?locale=fr&ref=github)

[Pointure épuisée sur Shopify en français](#pointure-épuisée-sur-shopify)

[Set up a Horizon gallery with your own products](https://recently-viewed-products.fly.dev/shopify-horizon-recently-viewed?locale=en&ref=github) · [Horizon-Galerie mit eigenen Produkten vorbereiten](https://recently-viewed-products.fly.dev/shopify-horizon-recently-viewed?locale=de&ref=github) · [Préparer la galerie Horizon avec vos produits](https://recently-viewed-products.fly.dev/shopify-horizon-recently-viewed?locale=fr&ref=github)

## Compare the sizes a shopper already viewed

In RVI Basic, select two or three products in **Recently viewed products** and choose **Check current price and availability**. RVI checks each saved size or color against the Shopify storefront in the shopper’s market. An exact variant Shopify can’t verify is marked as unverified. The product titles link back to the selected variants. [Compare two variants from a public catalog or your Shopify store](https://recently-viewed-products.fly.dev/variant-recovery-setup?locale=en&ref=github-compare#verified-comparison)

Enable **RVI product history** and add the **Recently viewed products** app block using Shopify’s theme editor. [RVI Basic in the Shopify App Store](https://recently-viewed-products.fly.dev/go/shopify/en-dawn-compare-direct)

In RVI Basic wählst du zwei oder drei Produkte unter **Kürzlich angesehen**. Der Vergleich prüft Preis und Bestellbarkeit der gemerkten Größen oder Farben im aktuellen Markt. Die Produkttitel öffnen die ausgewählten Varianten. [Varianten vergleichen](https://recently-viewed-products.fly.dev/variant-recovery-setup?locale=de&ref=github-compare#verified-comparison) · [RVI Basic im Shopify App Store](https://recently-viewed-products.fly.dev/go/shopify/de-dawn-compare-direct)

Dans RVI Basic, sélectionnez deux ou trois produits récemment consultés. Choisissez **Vérifier le prix et la possibilité de commander** pour contrôler les variantes enregistrées dans le marché de l’acheteur. [Comparer les variantes](https://recently-viewed-products.fly.dev/variant-recovery-setup?locale=fr&ref=github-compare#verified-comparison) · [RVI Basic sur le Shopify App Store](https://recently-viewed-products.fly.dev/go/shopify/fr-dawn-compare-direct)

### Compare replacement variants after returns

In RVI Basic, open **Compare fit returns** in the AI stockout worklist. Use a Shopify product export with unit costs and prepared delivery and return CSVs with exact Shopify variant IDs. Choose two replacements. You can specify the export language before checking current catalog prices and orderability in the historical buyer country. Enter the contribution for a returned unit separately, then review the exact pair before approving it. Fictional returns and costs can produce estimates of €32.25 and €24 per delivered unit.

With fictional sales data, nine 14-day periods point to protecting 12 of 15 pairs for direct sales. RVI uses the remaining three as replacement stock. [Test the stock reserve](https://recently-viewed-products.fly.dev/shopify-shared-replacement-stock?locale=en&ref=github-shared-stock#shared-stock-reserve). [Compare the required paid purchase rate after returns](https://recently-viewed-products.fly.dev/shopify-fit-return-comparison?locale=en#fit-return-proof).

#### Would a discount on the exact replacement pay off?

Enter the purchase rate at the regular price in one buyer country and the effective discount per paid order after refunds. The example moves a 5.00% purchase rate to a 5.72% break-even threshold for a €5 discount on a replacement with €40 contribution after returns. The same tool in RVI Basic uses the variant you selected after checking the Sidekick quotes, price and availability. The public example includes two linked fictional CSVs so you can see which original delivery fields and return reasons the calculation uses. [Calculate the discount break-even point](https://recently-viewed-products.fly.dev/shopify-fit-return-comparison?locale=en&ref=github-discount#discount-break-even)

**Deutsch.** Öffne in der KI-Arbeitsliste **Passform-Retouren vergleichen**. Nutze den Shopify-Produktexport mit Stückkosten sowie vorbereitete CSVs zu Auslieferungen und Retoureneingängen mit exakten Shopify-Varianten-IDs. Wähle zwei Ersatzvarianten. Gib bei Bedarf die Exportsprache an und prüfe aktuelle Katalogpreise und Bestellbarkeit im Käuferland der bisherigen Verkäufe. Trage den Deckungsbeitrag für eine retournierte Einheit separat ein und prüfe das exakte Paar vor der Freigabe. Fiktive Retouren und Kosten können Schätzwerte von 32,25 € und 24 € je ausgelieferter Einheit ergeben.

**Français.** Dans la liste de vérification IA de RVI Basic, ouvrez **Comparer les retours liés à la taille**. Utilisez l’export des produits Shopify avec les coûts unitaires et des CSV préparés de livraisons et de retours avec les identifiants exacts des variantes Shopify. Choisissez deux remplacements. Indiquez la langue de l’export si nécessaire et vérifiez les prix catalogue et la disponibilité à la commande dans le pays d’achat des ventes passées. Saisissez séparément la marge d’une unité retournée, puis vérifiez la paire exacte avant de l’approuver. Avec des retours et des coûts fictifs, les estimations peuvent être de 32,25 € et 24 € par unité livrée.

### Choose which sold-out sizes to review first

In RVI Basic, open **AI review for sold-out sizes**, load the Shopify product export with unit costs, and enter observed requests for exact variants in one country and a common period. Choose one of the ranked comparisons to open both alternatives. Review the catalog excerpts, then ask Shopify Sidekick whether they support a waterproofing claim. RVI checks the returned quotes. Your request counts and entered costs stay in your browser. Use the ranking to choose a comparison, then use returns and purchase data to measure its contribution. [Check a pair in your own shop](https://recently-viewed-products.fly.dev/shopify-footwear-fit-check?locale=en#footwear-pair)

**Deutsch.** Öffne in Basic die **KI-Arbeitsliste für ausverkaufte Größen**. Nutze den Shopify-Produktexport mit Stückkosten und erfasse beobachtete Anfragen für exakte Varianten im selben Land und Zeitraum. Wähle einen Vergleich und prüfe die angezeigten Katalogauszüge. Shopify Sidekick kann nach Belegen für Wasserdichtigkeit suchen. RVI prüft die Zitate. Anfragezahlen und erfasste Kosten bleiben im Browser. [Ein Variantenpaar im eigenen Shop prüfen](https://recently-viewed-products.fly.dev/shopify-footwear-fit-check?locale=de#footwear-pair)

**Français.** Dans Basic, ouvrez **Revue IA des pointures épuisées**. Importez le fichier des produits Shopify avec les coûts unitaires et saisissez les demandes observées pour des variantes exactes dans un même pays et sur une même période. Choisissez une comparaison, relisez les extraits et demandez à Sidekick de chercher une mention d’imperméabilité. RVI vérifie les citations reçues. Les nombres de demandes et les coûts saisis restent dans le navigateur. [Vérifier une paire dans votre boutique](https://recently-viewed-products.fly.dev/shopify-footwear-fit-check?locale=fr#footwear-pair)

### Compare foot lengths across shoe models

In RVI Basic, enter both exact variant links under **Footwear size mappings**. Open **Compare recommended foot lengths** and paste the manufacturer’s range for each size in mm or cm. RVI shows whether the replacement covers all, part or none of the original range. If you choose **Ask Shopify Sidekick**, Shopify receives the excerpts shown in the preview. Check width, intended audience and fit before approving the pair.

**Deutsch.** Gib in Basic unter **Größenzuordnungen für Ersatzschuhe** beide genauen Variantenlinks ein. Öffne **Empfohlene Fußlängen vergleichen** und füge für jede Größe den Herstellerbereich in mm oder cm ein. RVI zeigt, ob der Ersatz den ursprünglichen Bereich ganz, teilweise oder gar nicht abdeckt. Mit **Shopify Sidekick fragen** sendest du die Auszüge aus der Vorschau an Shopify. Prüfe Weite, Zielgruppe und Passform vor der Freigabe.

**Français.** Dans Basic, saisissez les deux liens de variante exacts sous **Correspondances de pointures**. Ouvrez **Comparer les longueurs de pied recommandées** et collez les plages du fabricant en mm ou en cm. RVI indique si le remplacement couvre toute la plage d’origine, une partie ou aucune. Choisissez **Demander à Shopify Sidekick** pour transmettre à Shopify les extraits de l’aperçu. Vérifiez la largeur, le public visé et le chaussant avant d’approuver la paire.

**EU 42.** Vaistoa recommends 260–265 mm for Hurmos 3 Winter and 257–263 mm for Uoma 4 Winter. The two guides overlap from 260 to 263 mm. [Hurmos 3 size guide](https://vaistoa.com/sv-se/products/hurmos-barefoot-casual-winter-boots?variant=59649033503045) · [Uoma 4 size guide](https://vaistoa.com/en-ca/collections/barefoot-trekking-hiking-shoes/products/uoma-winter-barefoot-trekking-boots)

## Free check for sold-out sizes

[Check your Shopify product CSV](https://recently-viewed-products.fly.dev/shopify-variant-audit?locale=en#audit-form-heading). If you stock at multiple locations, include your Shopify inventory export too. The files are processed in your browser.

In a result from your own catalog, open **Check replacement variants in Shopify**. Choose the pair, enter your permanent Shopify domain and specify the buyer country. Once Shopify confirms the original is unavailable and the replacement is orderable, review the fit. Use the two exact variants to [set up one free replacement](#set-up-one-free-shoe-size-replacement), or download the pair file to manage more replacements in RVI Basic.

The sample shows a potential alternative for EU 42 and another size to review for restocking. Download the CSV action plan to see the exact variants and SKUs. [Open the footwear sample](https://recently-viewed-products.fly.dev/shopify-variant-audit?locale=en&example=footwear#audit-result-heading)

If your collection shows sold-out shoe sizes, compare the selected size with and without Shopify's In stock filter. The guide walks through an example in US sizes and builds both comparison links. [Shopify shoe-size filter guide](https://recently-viewed-products.fly.dev/shopify-shoe-size-filter)

### Build a Shopify Shop by size menu

Use one collection for the menu. In a preview of your own storefront market, enable the size and Availability filters in Shopify Search & Discovery. Select one size and copy its collection URL. Enter the exact option values you want in the menu. The builder keeps your collection and market prefix and adds Shopify’s size and In stock filters to each link.

Open each link in the same market. Check both active filters and the exact buyable size on a product page before pasting the link into Shopify Navigation.

[Build menu links](https://recently-viewed-products.fly.dev/shopify-shoe-size-filter?locale=en&ref=shop-by-size#shop-by-size-menu) · [Créer des liens par pointure](https://recently-viewed-products.fly.dev/shopify-shoe-size-filter?locale=fr&ref=shop-by-size#shop-by-size-menu) · [Crear enlaces por talla](https://recently-viewed-products.fly.dev/shopify-shoe-size-filter?locale=es&ref=shop-by-size#shop-by-size-menu)


[Watch the 29-second example of exact-size recovery](https://recently-viewed-products.fly.dev/shopify-sold-out-despite-stock?locale=en&ref=github#find-size-replacement). The video uses a sample catalog.

In this fictional storefront, an approved US 9 is offered when EU 42 sells out. Try EU 43 to see what happens when the shop has no approved pair. [Try the approved size demo](https://recently-viewed-products.fly.dev/shopify-approved-footwear-demo?locale=en&ref=github)

Use recent sales and inventory to spot variants with up to 14 estimated days of stock. [Set up the Shopify Flow inventory check](shopify-flow-days-of-inventory-remaining.md).

When a variant sells out, Shopify Flow can look up the exact replacement variants you approved in RVI. [Open the template in Shopify Flow](https://admin.shopify.com/apps/flow/editor/templates/01a20f69-4642-74f5-9339-207279e410bb). Before activating it, install RVI and approve a replacement pair in Basic. You can also [download the workflow with variant IDs](https://github.com/JoGro-code/shopify-recently-viewed/releases/tag/rvi-flow-replacement-variant-ids-v2) or [the status-only workflow](https://github.com/JoGro-code/shopify-recently-viewed/releases/tag/rvi-flow-variant-replacement-v1).

If the size is already sold out, use the [public product check](https://recently-viewed-products.fly.dev/shopify-footwear-fit-check?locale=en#footwear-pair). Select the shopper's country and the unavailable size. Verify an orderable alternative in that country and save the exact pair code for review in RVI. The Flow template above starts when a variant newly sells out.

To hand a two-country check to your client, open the [guest wishlist market check](https://recently-viewed-products.fly.dev/shopify-guest-wishlist?locale=en#wishlist-recipient-markets). Enter two exact variant links and the two countries. When both checks finish, copy the review link or open a WhatsApp or email draft. Your client opens the link and checks current prices and orderability.

### Check a Shopify stockout pair with n8n

This free workflow checks whether an exact Shopify variant is sold out and a proposed replacement is orderable in the same size and buyer country. It reads the public catalog without a Shopify Admin token.

In the [n8n editor](https://docs.n8n.io/build/manage-workflows/export-and-import#from-the-editor-ui-menu), choose **Import from URL** and paste the [version 3 workflow URL](https://raw.githubusercontent.com/JoGro-code/shopify-recently-viewed/refs/heads/main/workflows/shopify-exact-size-replacement-v3.n8n.json). To try it locally without Docker, start `npx n8n@2.49.5` with Node.js 24.x and open `http://localhost:5678`. [Official npm setup](https://docs.n8n.io/deploy/host-n8n/install-options/install-with-npm#try-n8n-with-npx)

In **Edit variant links and market**, enter your permanent Shopify domain, buyer country, exact size option name and the two public variant links. Run the workflow and open **Verify exact size and availability**. An eligible output includes `rviHandoff.code`.

For one free replacement in one buyer country, copy the four-line value of `rviHandoff.code`. In RVI Setup for the same Shopify store, choose **Set up a free size replacement**, open **Fill fields from a prepared pair**, paste the code and choose **Use this pair**. Review both exact variants, the buyer country from n8n and the fit. Choose **Verify and save offer** to recheck current availability, then test the offer in a draft theme. [Install RVI and follow the Free setup](https://recently-viewed-products.fly.dev/n8n-shopify-exact-size?ref=github-workflow)

To import the full JSON for one eligible result or manage more pairs, use **RVI Basic → Footwear fit**. Paste the result and choose **Check and fill variant links**, then review fit and delivery before approval. [n8n v3 verification](https://github.com/JoGro-code/shopify-recently-viewed/actions/runs/45735353401) · [Previous v2 download](https://github.com/JoGro-code/shopify-recently-viewed/releases/download/rvi-n8n-exact-size-v2/shopify-exact-size-replacement.n8n.json) · [v2 test](https://github.com/JoGro-code/shopify-recently-viewed/actions/runs/45578383627)

The RVI product-history gallery and one approved product-page replacement in one buyer country are free. Basic adds more replacement pairs, cart offers and a guest wishlist with exact variants and sharing by link, WhatsApp or email. Approve a replacement pair and enable the shared-wishlist setting so recipients can check whether an approved replacement for a sold-out variant is orderable in their market. Basic costs US$2.49 every 30 days and has a seven-day free trial. [Try the guest wishlist](https://recently-viewed-products.fly.dev/?locale=en&demo=wishlist#size-demo) · [Install RVI from Shopify](https://apps.shopify.com/recently-viewed-products-7?locale=en&utm_source=github&utm_medium=referral&utm_campaign=rvi_relaunch_202611&utm_content=dawn_readme)

In the RVI admin, open **Size searches with no results** from the Basic **AI stockout worklist**. Paste Shopify report rows as `term,count` after removing personal details. RVI puts the highest counts first and can check exact quotes in a reply from your approved AI tool. After you confirm the match, RVI links the exact original or a previously approved replacement when Shopify confirms it is orderable in the chosen country. RVI also checks Shopify’s catalog price against any supported price cap in the search. Use Shopify Sidekick in RVI Basic to group up to eight compatible phrases from your own redacted Shopify report, then check one exact variant in the US market before choosing a phrase to test. [Try both price limits](https://recently-viewed-products.fly.dev/variant-recovery-setup?locale=en&ref=search-audit#search-audit).

[Try the no-result shoe search example](https://recently-viewed-products.fly.dev/shopify-search-rescue?locale=en&ref=github-search#search-intent-example). It uses fictional data to group compatible phrases and show how many more orders are needed to break even when testing one exact phrase.

### Audit Google Shopping spend when a size sells out

Match one Google Ads product report by item and day to full-day records of online orderability in your target country. For each matching offer, RVI Basic lists ad cost on documented stockout days. Any day with partial or missing coverage stays unclassified. The two files stay in the browser.

[Try the public audit](https://recently-viewed-products.fly.dev/shopify-shopping-stockout-audit?locale=en&ref=github-shopping-audit). In RVI Basic, go to **Stockout review → Audit Shopping spend**. To reproduce the example, download the [fictional Google Ads rows](examples/shopping-stockout/google-ads-item-days.csv?raw=1) and [fictional availability rows](examples/shopping-stockout/variant-availability.csv?raw=1), then select DE, EUR and Europe/Berlin. The first offer has €270.00 in ad costs on two documented stockout days. Another €75.00 for that offer stays unclassified.

[Audit one of your own Google Shopping items for free](https://recently-viewed-products.fly.dev/shopify-shopping-stockout-audit?locale=en&ref=github-shopping-audit#my-shopping-offer). Use the exact item ID from your report. Your files stay in the browser.

The separate budget example uses fictional data to show how returns and current stock change the decision. [Follow a Shopping budget decision](https://recently-viewed-products.fly.dev/shopify-shopping-budget-case?locale=en&ref=github)

For your own audit, filter the report to one Google Ads account, Merchant Center feed and country. Match the exact item ID to its Shopify variant and check that the full day is supported by evidence in the Ads account time zone. Use the ranked CSV to review the original offers in Merchant Center. [Google Ads reporting](https://support.google.com/google-ads/answer/3455573) · [Shopify inventory history](https://help.shopify.com/en/manual/inventory-and-locations/adjusting-inventory/adjustment-history)

## Ausverkaufte Größen kostenlos prüfen

[Eigene Shopify-Produkt-CSV prüfen](https://recently-viewed-products.fly.dev/shopify-variant-audit?locale=de#audit-form-heading). Ergänze bei mehreren Lagerstandorten den Shopify-Bestandsexport. Die Dateien werden im Browser verarbeitet.

Öffne im Ergebnis deines eigenen Katalogs **Ersatzvarianten in Shopify prüfen**. Wähle das Paar, gib deine dauerhafte Shopify-Domain an und wähle das Lieferland. Wenn Shopify den Ausverkauf und den bestellbaren Ersatz bestätigt, prüfe die Passform. [Richte mit den beiden genauen Varianten einen kostenlosen Ersatz ein](#set-up-one-free-shoe-size-replacement) oder lade die Paar-Datei herunter, um weitere Ersatzpaare in RVI Basic zu verwalten.

Das Beispiel zeigt eine mögliche Alternative für EU 42 und eine Größe zur Nachbestellprüfung. Der CSV-Aktionsplan enthält die genauen Varianten und SKUs. [Schuhbeispiel öffnen](https://recently-viewed-products.fly.dev/shopify-variant-audit?locale=de&example=footwear#audit-result-heading)

Im fiktiven Shop erscheint die freigegebene US 9 als Ersatz für eine ausverkaufte EU 42. Wähle EU 43, um den Fall ohne freigegebenes Paar zu prüfen. [Demo für freigegebene Größenpaare](https://recently-viewed-products.fly.dev/shopify-approved-footwear-demo?locale=de&ref=github)

Markiere Varianten mit bis zu 14 geschätzten Bestandstagen anhand von Verkaufstempo und Bestand. [Shopify-Flow-Bestandscheck einrichten (Englisch)](shopify-flow-days-of-inventory-remaining.md).

Shopify Flow kann bei einer ausverkauften Variante die genauen Ersatzvarianten abrufen, die du in RVI freigegeben hast. [Vorlage in Shopify Flow öffnen](https://admin.shopify.com/apps/flow/editor/templates/01a20f69-4642-74f5-9339-207279e410bb). Installiere RVI und gib vor der Aktivierung ein Ersatzpaar in Basic frei. Du kannst auch den [Workflow mit Varianten-IDs](https://github.com/JoGro-code/shopify-recently-viewed/releases/tag/rvi-flow-replacement-variant-ids-v2) oder den [Workflow zur Statusprüfung](https://github.com/JoGro-code/shopify-recently-viewed/releases/tag/rvi-flow-variant-replacement-v1) herunterladen.

Ist eine Größe bereits ausverkauft, öffne den [öffentlichen Produktcheck](https://recently-viewed-products.fly.dev/shopify-footwear-fit-check?locale=de#footwear-pair). Wähle das Lieferland und die ausverkaufte Größe. Prüfe, ob eine passende Variante dort bestellbar ist, und speichere den Paarcode für die Prüfung in RVI. Die Flow-Vorlage oben startet, sobald eine Variante neu ausverkauft ist.

Für die Abstimmung mit deinem Kunden kannst du den [Merklisten-Marktcheck](https://recently-viewed-products.fly.dev/shopify-guest-wishlist?locale=de#wishlist-recipient-markets) mit zwei exakten Variantenlinks und zwei Ländern durchführen. Nach der Prüfung kannst du den Prüflink kopieren oder einen Entwurf für WhatsApp oder E-Mail öffnen. Dein Kunde prüft damit aktuelle Preise und Bestellbarkeit.

Die RVI-Produktverlaufsgalerie und ein freigegebenes Ersatzangebot auf der Produktseite in einem Käuferland sind kostenlos. Basic ergänzt weitere Ersatzpaare, Warenkorbangebote und die Gast-Merkliste für exakte Varianten mit Teilen per Link, WhatsApp oder E-Mail. Gib ein Ersatzpaar frei und aktiviere die Prüfung für geteilte Merklisten. Empfänger können dann bei einer ausverkauften Variante prüfen, ob der freigegebene Ersatz in ihrem Markt bestellbar ist. Basic kostet 2,49 USD je 30 Tage und bietet sieben kostenlose Testtage. [Gast-Merkliste ausprobieren](https://recently-viewed-products.fly.dev/?locale=de&demo=wishlist#size-demo) · [RVI über Shopify installieren](https://apps.shopify.com/recently-viewed-products-7?locale=de&utm_source=github&utm_medium=referral&utm_campaign=rvi_relaunch_202611&utm_content=dawn_readme)

Öffne im RVI-Admin über die **KI-Arbeitsliste** von Basic den Bereich **Größensuchen ohne Ergebnis**. Entferne personenbezogene Angaben und füge Suchbegriffe und Anzahlen aus dem Shopify-Bericht als `term,count` ein. RVI sortiert nach Häufigkeit und kann wörtliche Zitate aus der Antwort deines freigegebenen KI-Tools prüfen. Bestätige die Übereinstimmung. RVI verlinkt die genaue Originalvariante oder einen bereits freigegebenen Ersatz, wenn Shopify die Bestellbarkeit im gewählten Land bestätigt. Eine unterstützte Preisgrenze aus der Suche gleicht RVI mit dem Shopify-Katalogpreis ab. [Beide Preisgrenzen ausprobieren](https://recently-viewed-products.fly.dev/variant-recovery-setup?locale=de&ref=search-audit#search-audit).

[Eine Suche im eigenen Shop prüfen](https://recently-viewed-products.fly.dev/shopify-search-rescue?locale=de&ref=search-audit).

### Shopping-Werbekosten für ausverkaufte Größen prüfen

RVI Basic gleicht einen Google-Ads-Tagesbericht mit Belegen zur Online-Bestellbarkeit derselben Variante im Zielland ab. Die Arbeitsliste sortiert nach gemeldeten Werbekosten an belegten Ausverkaufstagen. Unvollständig belegte Tage bleiben offen. [Fiktiven Bericht online prüfen](https://recently-viewed-products.fly.dev/shopify-shopping-stockout-audit?locale=de&ref=github-shopping-audit)

[Einen eigenen Google-Shopping-Artikel kostenlos prüfen](https://recently-viewed-products.fly.dev/shopify-shopping-stockout-audit?locale=de&ref=github-shopping-audit#my-shopping-offer). Verwende die genaue Artikel-ID aus dem Bericht. Deine Dateien bleiben im Browser.

Ein zweites Beispiel zeigt mit fiktiven Daten, wie Retouren und aktueller Bestand die Budgetentscheidung verändern. [Shopping-Budgetentscheidung nachvollziehen](https://recently-viewed-products.fly.dev/shopify-shopping-budget-case?locale=de&ref=github)

## Pointure épuisée sur Shopify

[Chercher un remplacement à partir d’une fiche produit Shopify](https://recently-viewed-products.fly.dev/shopify-footwear-fit-check?locale=fr&ref=github&via=approved-demo#footwear-pair). Collez le lien de la fiche d’origine, indiquez le pays de livraison et choisissez la pointure épuisée. Si le formulaire vous le demande, ajoutez l’adresse permanente de votre boutique en `.myshopify.com`. Ouvrez **Comparer plusieurs coloris dans cette pointure**, puis **Chercher dans le catalogue Shopify**. Vérifiez le modèle et le chaussant de la variante disponible dans le pays choisi avant de préparer la paire.

[Vérifier une pointure en rupture de stock dans votre collection](https://recently-viewed-products.fly.dev/shopify-shoe-size-filter?locale=fr#shoe-filter-test). Comparez le filtre de pointure seul et le même filtre avec En stock. Ensuite, choisissez **Vérifier une variante de votre boutique** pour contrôler un remplacement dans le même marché.

[Essayer la démo en français](https://recently-viewed-products.fly.dev/shopify-approved-footwear-demo?locale=fr&ref=github). Dans le catalogue fictif, sélectionnez **EU 42** puis **Chercher une alternative validée** pour ouvrir la variante US 9 approuvée par la boutique. Recommencez avec **EU 43** pour voir le cas où aucune alternative n’a été validée.

Après l’essai, choisissez **Vérifier un produit de ma boutique**. Collez un lien produit, indiquez le pays de livraison et choisissez la pointure épuisée, puis un remplacement que Shopify confirme dans le catalogue de ce pays. Cliquez sur **Préparer la paire** et copiez son code.

Si chaque couleur a sa propre fiche et que les deux fiches proposent uniquement des pointures, [utilisez les deux liens produit habituels](https://recently-viewed-products.fly.dev/shopify-footwear-fit-check?locale=fr&ref=github&via=approved-demo#footwear-pair).

1. Collez le lien de la fiche d’origine, indiquez le pays de livraison, puis cliquez sur **Vérifier les variantes dans Shopify**. Si vous utilisez votre propre domaine, ajoutez l’adresse permanente de la boutique en `.myshopify.com`.
2. Choisissez la pointure épuisée, puis cliquez sur **Vérifier cette pointure sur une autre fiche**. Collez le lien de la seconde fiche et relancez la vérification. Shopify doit confirmer un seul remplacement disponible à la même pointure.
3. Cliquez sur **Préparer la paire**, puis copiez le code ou téléchargez le fichier. Après avoir [installé RVI](https://recently-viewed-products.fly.dev/go/shopify/fr-dawn-free-size-offer), ouvrez **Configurer un remplacement gratuit**, puis **Remplir les champs avec une paire préparée**. Collez le code ou importez le fichier. Vérifiez les deux variantes et le pays de vente, confirmez le chaussant, puis choisissez **Vérifier et enregistrer l’offre**. Testez le remplacement dans un thème brouillon, dans le même pays.

Pour vérifier deux ou trois coloris en une seule fois, choisissez d’abord la pointure épuisée et ouvrez **Comparer plusieurs coloris dans cette pointure**. Collez un lien de fiche par ligne. Après la vérification Shopify dans votre marché, choisissez un coloris disponible et confirmez qu’il convient avant de préparer la paire.

Pour proposer un premier remplacement sur la fiche produit dans un seul pays, suivez la [configuration du remplacement gratuit](#set-up-one-free-shoe-size-replacement). Pour gérer plusieurs paires, ouvrez **Correspondances de pointures** dans RVI Basic. Importez le code et laissez RVI vérifier les deux variantes. Vérifiez le chaussant et la livraison avant d’approuver la paire. Activez ensuite **Afficher les alternatives sur la fiche produit** dans un thème brouillon et testez la pointure épuisée avant de publier. [Suivre le guide de configuration](https://recently-viewed-products.fly.dev/variant-recovery-setup?locale=fr)

### La pointure exacte vient de revenir à l’entrepôt

Une commande payée attend son expédition et la même variante est en contrôle à l’entrepôt ? Dans RVI Basic, comparez le coût du contrôle et la marge avec le remplacement ou le remboursement déjà prévu. Vérifiez la disponibilité de cette solution pendant le contrôle. [Voir le cas fictif et le seuil de rentabilité](https://recently-viewed-products.fly.dev/shopify-fit-return-comparison?locale=fr&via=paid-order#received-original-example).

### Dépenses Shopping sur une pointure épuisée

Dans RVI Basic, rapprochez un rapport Google Ads par article et par jour de vos justificatifs de disponibilité en ligne dans le pays ciblé. La liste classe les variantes par coût publicitaire les jours de rupture documentés. Les journées dont la disponibilité reste incertaine gardent leur propre catégorie. [Vérifier un rapport fictif](https://recently-viewed-products.fly.dev/shopify-shopping-stockout-audit?locale=fr&ref=github-shopping-audit)

[Vérifier gratuitement l’un de vos articles Google Shopping](https://recently-viewed-products.fly.dev/shopify-shopping-stockout-audit?locale=fr&ref=github-shopping-audit#my-shopping-offer). Utilisez l’identifiant exact de l’article dans votre rapport. Vos fichiers restent dans le navigateur.

Un deuxième exemple illustre l’effet des retours et du stock actuel sur la décision de budget, avec des données fictives. [Suivre une décision de budget Shopping](https://recently-viewed-products.fly.dev/shopify-shopping-budget-case?locale=fr&ref=github)

## Preview the Dawn theme example

Use an unpublished copy of Dawn. The example uses `localStorage`, the shop's Shopify Ajax product routes and EUR price formatting. The section expects Dawn's `component-card.css`, `component-price.css`, and `section-related-products.css`. Its optional blob and arch image shapes also depend on `mask-blobs.css` and the `mask-arch` snippet respectively.

1. Add [the JavaScript file](Assets/recently-viewed.js) as `assets/recently-viewed.js` and [the section](Sections/recently-viewed-products.liquid) as `sections/recently-viewed-products.liquid` in the test theme.
2. Load the asset in `layout/theme.liquid` before `</head>` using `<script src="{{ 'recently-viewed.js' | asset_url }}" defer></script>`.
3. Use [the sample product template](Templates/product.json) as a reference. Add an entry of type `recently-viewed-products` to the `sections` object in your existing product JSON template and add that entry's key to the template's `order` array.
4. Open published product pages in the unpublished theme preview and check that the section displays your recent products.

In **Try the guest wishlist** above, open the ready-made shared sample to see the recipient view. To try sharing, choose EU 42 and EU 43 of the sample shoe and click **Save this size** for each. Select **Share the sample wishlist**, then **Open the recipient view** to check that both sizes appear.

Öffne oben unter **Gast-Merkliste ausprobieren** die vorbereitete Beispiel-Merkliste, um die Empfängeransicht zu sehen. Wenn du das Teilen ausprobieren möchtest, wähle EU 42 und EU 43 des Beispielschuhs und klicke jeweils auf **Diese Größe merken**. Klicke auf **Beispiel-Merkliste teilen** und dann auf **Empfängeransicht öffnen**, um beide Größen zu prüfen.
