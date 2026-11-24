# Days of inventory remaining in Shopify Flow

Use a morning workflow to see which tracked variants are estimated to run out in the next 14 days. This example uses the past 30 completed days of Shopify inventory data and shows up to 20 rows in the Flow run log.

Shopify Flow accepted this query in the native preview on a development store. That store returned zero rows for the selected window. Build the workflow in your store and check your preview before scheduling it.

## Build the inventory check

1. In Shopify Flow, create a workflow with **Scheduled time**. Choose a daily time in your store's time zone. Keep it inactive while you configure it.
2. Add **Get analytics data**. Choose **Add query**, open the editor, replace the editor contents with the query below, then choose **Run**. Shopify shows whether the query is valid and previews the result before you choose **Save**.
3. Add **Log output** and paste the snippet below. Use Flow’s test mode to check both steps under **Recent runs** before enabling your regular schedule.

The query runs in Shopify Flow. Its only output is the run log in your store.

[Scheduled time](https://help.shopify.com/en/manual/shopify-flow/reference/triggers/scheduled-time) · [Get analytics data](https://help.shopify.com/en/manual/shopify-flow/reference/actions/get-analytics-data) · [Log output](https://help.shopify.com/en/manual/shopify-flow/reference/actions/log-output)

### ShopifyQL query

```text
FROM inventory
  SHOW ending_inventory_units, inventory_units_sold_per_day,
    days_of_inventory_remaining
  WHERE inventory_is_tracked = true
  GROUP BY product_variant_id, product_title, product_variant_title,
    product_variant_sku
  HAVING ending_inventory_units > 0
    AND inventory_units_sold_per_day > 0
    AND days_of_inventory_remaining <= 14
  SINCE startOfDay(-30d) UNTIL endOfDay(-1d)
  ORDER BY days_of_inventory_remaining ASC
  LIMIT 20
```

Shopify estimates remaining days by dividing ending inventory by average units sold per day. The query uses the last completed day's snapshot across inventory locations. It omits variants with no recorded sales pace and variants that had already reached zero on that snapshot. Stock can change since the snapshot. Use each row to decide what to check in Shopify, and confirm the market and exact variant before approving a replacement.

Use the variant ID to tell variants apart when SKUs are missing or shared. If your catalog changes often, also check for repeated variant IDs when reviewing the grouped rows. The report is limited to the first 20 tracked rows with recorded sales pace.

[Inventory schema and formula](https://shopify.dev/docs/api/shopifyql/latest/schemas/inventory/inventory) · [ShopifyQL filters](https://shopify.dev/docs/api/shopifyql/latest/syntax/having) · [Completed-day reporting windows](https://shopify.dev/docs/apps/build/shopifyql/graphql-admin-api/errors-limits-and-performance)

### Log output

```liquid
{% if getAnalyticsData.rows == nil %}
UNVERIFIED | Check the analytics step for the missing result.
{% elsif getAnalyticsData.rows.size == 0 %}
NO_MATCHES | The query returned zero rows for the selected window.
{% else %}
{% for row in getAnalyticsData.rows %}
{{ row.product_title }} / {{ row.product_variant_title }} | ID {{ row.product_variant_id }} | SKU {{ row.product_variant_sku }} | {{ row.ending_inventory_units }} units | {{ row.days_of_inventory_remaining }} days
{% endfor %}
{% endif %}
```

If Flow rejects the query or the analytics step fails, check its error in **Recent runs**. Treat a failed or incomplete run as unverified. A completed run with zero returned rows means the query found no matches in the selected window. Continue to check current stock before making buying decisions. [Workflow run history](https://help.shopify.com/en/manual/shopify-flow/manage/monitor)

## Prepare a replacement for an at-risk size

Use the report to pick one important size to review. The RVI footwear sample shows a candidate for EU 42 and a separate size to review for restocking. The free CSV check processes Shopify exports in your browser. A real replacement needs the merchant's approval and its own current availability check in the target market. [Try the footwear sample](https://recently-viewed-products.fly.dev/shopify-variant-audit?locale=en&example=footwear#audit-result-heading)

## Check the first result

Compare one returned variant ID with Shopify’s inventory report for the same completed-day window. The row should have positive ending inventory and recent sales, with no more than 14 estimated days of stock. If your preview returns zero rows, check that Shopify reports sales and inventory for the window. Shopify excludes test orders from sales reports. [Shopify sales reports](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/sales-report)

## Compare sales pace when a size was sold out

In this fictional example, ShopifyQL reports 56 units sold and 28 days between the first and last inventory snapshot for the same variant. Shopify's rate is **56 ÷ 28 = 2 units per day**. If your records independently show that the variant was orderable for eight full days in the same sales channel and market, and all 56 comparable units sold on those days, the observed pace was **56 ÷ 8 = 7 units per orderable day**. If either input is unknown, show Shopify's reported rate and leave the second rate blank. The comparison helps review a reorder quantity. Missed sales require separate evidence. [ShopifyQL inventory definitions](https://shopify.dev/docs/api/shopifyql/latest/schemas/inventory/inventory#inventory_units_sold_per_day)

Since October 1, 2026, Shopify's inventory reports use **On hand** stock, which includes committed and unavailable units. Earlier data still uses **Available**. The **Available** column and adjustment history help check individual warehouse figures. For the buyer's market, separately check catalog inclusion, delivery from the supplying locations and the policy on selling when out of stock. [Shopify inventory reports](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/inventory-reports#considerations-for-inventory-reports) · [Inventory adjustment history](https://help.shopify.com/en/manual/inventory-and-locations/adjusting-inventory/adjustment-history) · [Catalogs and markets](https://help.shopify.com/en/manual/markets/customizations/catalogs#product-publishing-and-availability) · [Shipping checks](https://help.shopify.com/en/manual/fulfillment/setup/shipping-rates/troubleshooting) · [Compare a reorder decision in the RVI example](https://recently-viewed-products.fly.dev/shopify-reorder-decision?locale=en)

If a size is already unavailable and another confirmed variant has spare stock, compare offering that exact replacement with keeping those same units for normal sale. Use Shopify’s Available count from one location, protect your reserve and compare both paths after returns and costs. [Work through the surplus stock example](https://recently-viewed-products.fly.dev/shopify-reorder-decision?locale=en&ref=github-inventory#use-overstock)

To measure it with RVI Basic, set aside two separately tracked lots of the same exact variant within the available stock above your reserve. Save the pilot plan and unit list before any sales. After the returns window, load the unit list and a separate outcome CSV. RVI shows realized contribution per assigned unit once all outcomes match.

### Verkaufstempo bei ausverkaufter Größe vergleichen

Im fiktiven Beispiel meldet ShopifyQL für dieselbe Variante 56 Verkäufe und 28 Tage zwischen der ersten und letzten Bestandsaufnahme. Shopify berechnet **56 ÷ 28 = 2 Stück pro Tag**. War die Variante im selben Vertriebskanal und Markt nachweislich acht volle Tage bestellbar und wurden alle 56 vergleichbaren Einheiten an diesen Tagen verkauft, betrug das beobachtete Tempo **56 ÷ 8 = 7 Stück pro bestellbarem Tag**. Fehlt einer dieser Belege, zeige den Shopify-Wert und lass den zweiten Wert offen. Der Vergleich hilft bei der Nachbestellung. Entgangene Verkäufe brauchen einen eigenen Nachweis. [ShopifyQL-Bestandskennzahlen](https://shopify.dev/docs/api/shopifyql/latest/schemas/inventory/inventory#inventory_units_sold_per_day)

Seit dem 1. Oktober 2026 verwenden Shopifys Bestandsberichte **Auf Lager**. Darin sind reservierte und nicht verfügbare Einheiten enthalten. Ältere Daten zeigen weiterhin **Verfügbar**. Die Spalte **Verfügbar** und der Anpassungsverlauf helfen bei der Prüfung am Lagerstandort. Prüfe für den Verkaufsmarkt zusätzlich den Katalog, den Versand vom jeweiligen Standort und den Weiterverkauf bei null Bestand. [Shopify-Inventarberichte](https://help.shopify.com/de/manual/reports-and-analytics/shopify-reports/report-types/default-reports/inventory-reports) · [Nachbestellung im RVI-Beispiel vergleichen](https://recently-viewed-products.fly.dev/shopify-reorder-decision?locale=de)

Ist eine Größe bereits ausverkauft und ein passender Ersatz noch verfügbar, vergleiche den Einsatz derselben Stücke als Ersatz oder im regulären Verkauf. Verwende den verfügbaren Bestand eines Lagerorts, schütze deine Reserve und rechne beide Wege nach Retouren und Kosten. [Beispiel für Überbestand als Ersatz öffnen](https://recently-viewed-products.fly.dev/shopify-reorder-decision?locale=de&ref=github-inventory#use-overstock)

Für die Auswertung in RVI Basic legst du zwei getrennt erfasste Gruppen derselben Variante oberhalb deiner Reserve an. Speichere Pilotplan und Stückliste vor dem Verkaufsstart. Nach der Retourenfrist lädst du die Stückliste und eine separate Ergebnis-CSV. RVI zeigt den erzielten Deckungsbeitrag je eingeplantem Stück, sobald alle Ergebnisse zugeordnet sind.

## Transfer the original or sell the approved replacement

When a size is unavailable in the buyer’s market, assess whether another location can spare the original SKU. In RVI Basic, open **Compare transfer and replacement**, choose the approved pair, and verify the recipient can ship to that market. Enter the reserve at the sending location, the time until the original can ship, and the same planned quantity for both choices. RVI checks the current pair in Shopify before showing the estimate.

In the worked example, five original sales at €32 contribute €122 after €18 freight and €20 in contribution given up at the sending location. Four replacement sales at €24 contribute €96. The transfer needs estimated sell-through of 83.75% after arrival to match the replacement. The values are fictional. Replace them with contributions after returns and include both locations when reviewing actual results.

The optional Sidekick step reviews the selected excerpts of your transfer rules. Review the preview, share it in Sidekick, and check the answer against the source quote. [Shopify fulfillment locations](https://help.shopify.com/en/manual/inventory-and-locations/setup/fulfillable-inventory) · [RVI Basic and Free Gallery](https://recently-viewed-products.fly.dev/go/shopify/en-dawn-free-gallery)

### Original umlagern oder freigegebenen Ersatz verkaufen

Öffne in RVI Basic **Umlagerung und Ersatz vergleichen** und wähle das freigegebene Paar. Bestätige, dass der empfangende Standort die Originalvariante in den gewählten Markt versenden kann. Gib die Reserve, die Zeit bis zum Versand und dieselbe Stückzahl für beide Optionen an. RVI prüft die Bestellbarkeit beider Varianten in Shopify.

Im fiktiven Beispiel bleiben nach dem Verkauf von fünf Originalstücken zu je 32 € Deckungsbeitrag, 18 € Fracht und 20 € entgangenem Beitrag am abgebenden Standort **122 €**. Vier Verkäufe des Ersatzes zu je 24 € ergeben **96 €**. Ab 83,75 Prozent erwartetem Verkaufsanteil nach Ankunft erreicht die Umlagerung den geschätzten Beitrag des Ersatzes. Für die eigene Auswertung zählen die Beiträge beider Standorte nach Retouren. Die optionale Sidekick-Prüfung arbeitet mit ausgewählten Auszügen deiner Umlagerungsregeln. [RVI Basic und Gratisgalerie](https://recently-viewed-products.fly.dev/go/shopify/de-dawn-free-gallery)

## Check a new purchase order CSV

Stocky stopped managing inventory on August 31, 2026. To reorder a variant from the Flow report, confirm its exact SKU or barcode in the shop and start a draft under **Products → Purchase orders**. Use Shopify’s purchase order CSV template and a current all-products export from the same shop. The free RVI check looks for a unique variant match and flags duplicate lines before import. Both files stay in your browser. Keep historical Stocky purchase orders separately for your records. [Check the CSVs](https://recently-viewed-products.fly.dev/shopify-purchase-order-csv-check?locale=en&ref=github-purchase-order) · [Shopify CSV template and import](https://help.shopify.com/en/manual/inventory-and-locations/purchase-orders/creating-purchase-orders#import-products-csv) · [Stocky transition](https://help.shopify.com/en/manual/inventory-and-locations/transitioning-from-stocky)

### Einkaufsbestellungs-CSV prüfen

Seit dem 31. August 2026 läuft die Bestandsverwaltung in Shopify statt in Stocky. Wenn du eine Variante aus dem Flow-Bericht nachbestellen willst, prüfe ihre genaue SKU oder ihren Barcode und lege unter **Produkte → Bestellungen** einen Entwurf an. Verwende Shopifys CSV-Vorlage und einen aktuellen Export aller Produkte aus demselben Shop. Der kostenlose RVI-Check prüft eindeutige Treffer und markiert doppelte Zeilen vor dem Import. Beide Dateien bleiben im Browser. Historische Stocky-Bestellungen bewahrst du separat auf. [CSVs prüfen](https://recently-viewed-products.fly.dev/shopify-purchase-order-csv-check?locale=de&ref=github-purchase-order) · [Shopify-Vorlage und Import](https://help.shopify.com/de/manual/inventory-and-locations/purchase-orders/creating-purchase-orders#import-products-csv) · [Wechsel von Stocky](https://help.shopify.com/de/manual/inventory-and-locations/transitioning-from-stocky)

## Check a supplier invoice after a split delivery

Compare the agreed order line, units accepted across linked shipments and units already billed. Use the original PO currency. In this example, you ordered 30 units at €20 net, accepted 20 and were already billed for 10. A new invoice for 24 at €22.50 has **€25 in price differences** on the 10 matched units and **€90 for four units above the confirmed order**. A separate **€225 covers ten units still expected**. Check any approved order changes and review those ten units after receiving. [Shopify receiving and partial shipments](https://help.shopify.com/en/manual/inventory-and-locations/purchase-orders/creating-inventory-transfers) · [Shopify purchase order reports](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/custom-reports/purchase-orders)

**RVI Basic** compares two tab-separated tables in your browser and shows amounts for review before payment. Use one row per exact SKU, up to 100 data rows and 64 KiB per table. The Shopify shipment report option prepares a query for one purchase order. Export the complete report as a CSV, then review and apply its accepted quantities. After comparing, download the differences as a text file with the amounts still awaiting receipt shown separately. [Export a Shopify report](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/custom-reports/export-reports)

### Lieferantenrechnung nach einer Teillieferung prüfen

Vergleiche die bestätigte Bestellposition, die angenommenen Mengen aller verknüpften Lieferungen und die bereits berechnete Menge. Verwende die ursprüngliche Bestellwährung. Im Beispiel wurden 30 Stück zu 20 EUR netto bestellt, 20 angenommen und 10 bereits berechnet. Bei 24 neu berechneten Stück zu 22,50 EUR ergeben sich **25 EUR Preisabweichung** auf zehn zugeordneten Stück und **90 EUR für vier Stück über der bestätigten Bestellmenge**. Weitere **225 EUR betreffen zehn noch erwartete Stück**. Prüfe genehmigte Bestelländerungen und gleiche die offenen Stück nach Wareneingang erneut ab.

**RVI Basic** vergleicht zwei tabulatorgetrennte Tabellen im Browser und zeigt Beträge zur Prüfung vor der Zahlung. Verwende eine Zeile je exakter SKU, bis zu 100 Datenzeilen und 64 KiB pro Tabelle. Die Versandbericht-Option erstellt eine Abfrage für eine Bestellung. Exportiere den vollständigen Bericht als CSV. Prüfe die angenommenen Mengen in der Vorschau und übernimm sie. Danach kannst du die Abweichungen als Textdatei herunterladen. Beträge für offene Liefermengen stehen separat. [Shopify-Bericht exportieren](https://help.shopify.com/de/manual/reports-and-analytics/shopify-reports/report-types/custom-reports/export-reports)

[RVI on the Shopify App Store · RVI im Shopify App Store](https://apps.shopify.com/recently-viewed-products-7)
