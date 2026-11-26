# Shopify theme app block preflight

Verify that the app blocks required by your Shopify product templates survive a theme change. Supply the exact app block type for each template. The check verifies that there is one matching block, that its section and ancestors are enabled, and that it is scheduled in each relevant `order` or `block_order` array. It works with Shopify JSONC exports and nested dynamic blocks.

For example, put one required placement in the original product template and another in the replacement product template. If both products use the same template, check that placement once. Copy the full `shopify://apps/…/blocks/…/…` type for each block from an approved checkout in your own theme repository.

```yaml
name: Check Shopify product templates
"on": workflow_dispatch
permissions:
  contents: read
jobs:
  check-theme:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
        with:
          persist-credentials: false
      - uses: JoGro-code/shopify-recently-viewed/theme-app-block-preflight@main
        with:
          theme-root: .
          placements: |
            [
              {
                "template": "templates/product.json",
                "blockType": "shopify://apps/example-app/blocks/replacement/12345678-1234-1234-1234-123456789abc"
              },
              {
                "template": "templates/product.alternate.json",
                "blockType": "shopify://apps/example-app/blocks/replacement/12345678-1234-1234-1234-123456789abc"
              }
            ]
```

Use your actual template paths and block type values. Once you have tested the action, you can pin the reference to a full commit SHA. Set `theme-root` only if the theme is in a directory within the checkout. An optional `settings` object on each placement verifies its complete settings value. Omit it to check placement alone. The action reads local theme files and does not send settings to Shopify or include them in diagnostics.

Shopify places static blocks through Liquid. If a required block has a static ancestor, the action asks for a native preview. For dynamic blocks, a passing check verifies the saved template data. Use the Theme Editor preview to confirm how Liquid renders it and verify current product availability before publishing. [Shopify app blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks/app-blocks) · [Shopify static blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/static-blocks)

## Example with RVI

RVI offers one approved shoe replacement in one buyer country on its Free plan. The demo shows a sold-out EU 42 and an available EU 42 replacement. You can use this check to keep the native app block present on the templates used by both products. [Open RVI and its demo in the Shopify App Store](https://apps.shopify.com/recently-viewed-products-7?utm_source=github&utm_medium=referral&utm_campaign=rvi_first_merchant_202611&utm_content=theme_app_block_preflight)

Run the local suite with `node --test theme-app-block-preflight/check.test.mjs`.
