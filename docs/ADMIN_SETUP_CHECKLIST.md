# Admin Setup Checklist (Before App Integration)

最終更新日: 2026-04-13
対象: 新規Shopifyストア（Horizon）

補足:
- 別ストア移行時は、実行順を `NEW_STORE_SETUP_PLAYBOOK.md` に従う
- Codex + Shopify AI Toolkit の運用手順は `CODEX_SHOPIFY_AI_TOOLKIT_RUNBOOK.md` を参照

## 0. 開発環境チェック（先に実施）
- `shopify version` が `3.93.2` 以上であること
- Codex 側で Shopify Dev MCP / Shopify skills が有効化済みであること
- ドメイン運用を分離すること
  - テーマ表示/プレビュー: `rughaus-gl.myshopify.com`
  - `shopify store` 実行: `xfxfwd-8p.myshopify.com`

推奨コマンド:
```bash
shopify store auth --store xfxfwd-8p.myshopify.com --scopes read_products,read_inventory,write_products,write_inventory
shopify store execute --store xfxfwd-8p.myshopify.com --query "query { shop { name primaryDomain { url } } }"
shopify theme check --path . --fail-level error --output json
```

## 1. Markets / Languages
- Marketsで `United States / Hong Kong SAR / Italy` を有効化
- 通貨を確認（USD / HKD / EUR）
- Languagesで `EN/DE/FR/IT/ES/ZH-TW/KO` を有効化
- 自動判定（言語/通貨）を有効化
- ヘッダーで手動切替できることを確認

## 2. Collections
- 作成:
  - `all-rugs`
  - `custom-rugs`
  - `stock-rugs`
- テンプレート割当:
  - `all-rugs` -> `collection.all-rugs`
  - `custom-rugs` -> `collection.custom-rugs`
  - `stock-rugs` -> `collection.stock-rugs`

## 3. Pages
- 作成:
  - `about`
  - `trade`
  - `support-faq`
- テンプレート割当:
  - `about` -> `page.about`
  - `trade` -> `page.trade`
  - `support-faq` -> `page.support-faq`

## 4. Products
- サイズオーダー商品に `product.custom-rug` を割当
- 既製品に `product.stock-rug` を割当

## 5. Navigation
- Main menuを以下で作成:
  - Custom order rugs -> `/collections/custom-rugs`
  - In-stock rugs -> `/collections/stock-rugs`
  - About -> `/pages/about`
  - Trade -> `/pages/trade`
  - Support & FAQ -> `/pages/support-faq`

## 6. Markets/Catalog公開制御の確認
- 商品/コレクションの公開可否はMarkets/Catalogのみで管理する
- テーマ側で判定するための `available_country_codes` メタフィールドは作成しない
- 非公開対象へのアクセス挙動はShopify標準挙動で確認する

## 7. PDP詳細文言メタフィールド（必須）
- Product metafield definitions（namespace: `custom`）:
  - `pdp_materials` (`multi_line_text_field`)
  - `pdp_care` (`multi_line_text_field`)
  - `pdp_size_guide` (`multi_line_text_field`)
  - `pdp_shipping_returns` (`multi_line_text_field`)
- 目的:
  - Custom/Stock PDPのAccordion 4項目を商品ごとに管理する
- 注意:
  - GitHub統合テーマの制約により、JSON動的ソース依存は使わない
  - 上記定義後は、Liquid実装で `custom.pdp_*` の動的連動が有効になる
