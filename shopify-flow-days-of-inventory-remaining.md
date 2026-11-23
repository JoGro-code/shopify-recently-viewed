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
