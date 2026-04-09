# Admin Setup Checklist (Before App Integration)

最終更新日: 2026-04-09
対象: 新規Shopifyストア（Horizon）

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

## 6. 市場アクセスガード用メタフィールド
- Collection metafield（どちらか）:
  - `custom.available_country_codes` (single line text)
  - `rughaus.available_country_codes` (single line text)
- Product metafield（どちらか）:
  - `custom.available_country_codes` (single line text)
  - `rughaus.available_country_codes` (single line text)
- 値例:
  - `US,HK,IT`

## 7. 確認
- 非許可国で対象商品/コレクションURLを開くと利用不可メッセージが表示される
- 許可国では通常表示される
