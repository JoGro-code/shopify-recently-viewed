# Days of inventory remaining in Shopify Flow

Use a morning workflow to see which tracked variants are estimated to run out in the next 14 days. This example uses the past 30 completed days of Shopify inventory data and shows up to 20 rows in the Flow run log.

**Draft awaiting a native Shopify test.** Build the three steps in an authorized development store. The export is pending the checks below.

## Build the inventory check

1. In Shopify Flow, create a workflow with **Scheduled time**. Choose a daily time in your store's time zone. Keep it inactive while you configure it.
2. Add **Get analytics data** and paste the query below. Save the workflow to validate the query against your store.
3. Add **Log output** and paste the snippet below. Check the **Get analytics data** and **Log output** steps under **Recent runs** after the scheduled test.

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

## Checks before releasing a Flow export

- In an authorized development store, verify that Shopify accepts the exact query and shows its expected columns. Document the store time zone and latest available snapshot.
- Confirm a populated run with the exact variant ID, positive ending units and recent sales, and at most 14 estimated days. Use known comparison variants to verify that zero stock, no sales history and stock above the threshold are omitted.
- If the development store lacks qualifying inventory analytics, record the populated case as pending. Check the actual inventory report before relying on test orders. Shopify excludes test orders from sales reports. [Shopify sales reports](https://help.shopify.com/en/manual/reports-and-analytics/shopify-reports/report-types/default-reports/sales-report)
- Confirm a successful run with no matching rows. Use a deliberately invalid query in a test copy to verify that a native error stays distinct from an empty result. Keep all test workflows inactive afterward.
- Export only the validated three-step workflow. Remove shop data, recipient values and store-specific identifiers. Import it as inactive in a second authorized development store and verify that the three steps and query survive the round trip. [Shopify Flow import and export](https://help.shopify.com/en/manual/shopify-flow/manage/manage)
