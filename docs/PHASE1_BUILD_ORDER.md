# Phase 1 Build Order (App Deferred)

最終更新日: 2026-04-13
対象: Shopify Horizon / 新規ストア / アプリ実装は後回し

## 目的
- アプリなしで先に進める基盤を固定し、後続のLPO/B2B連携で手戻りを減らす。

## 進捗管理
- タスク進捗の正本は `EXECUTION_STATUS.md` を参照する

## 実装順（推奨）
1. IAテンプレート分離
2. 多言語/多通貨UIの表示確認（ヘッダー）
3. 市場公開制御（Shopify Markets/Catalog標準）
4. 基本ページの本文作成（About / Trade / Support & FAQ）
5. メニュー配線
6. 計測の最小イベント実装（GA4）

## 1) IAテンプレート分離（完了）
- 追加済みテンプレート:
  - `templates/collection.all-rugs.json`
  - `templates/collection.custom-rugs.json`
  - `templates/collection.stock-rugs.json`
  - `templates/product.custom-rug.json`
  - `templates/product.stock-rug.json`
  - `templates/page.about.json`
  - `templates/page.trade.json`
  - `templates/page.support-faq.json`

## 2) 多言語/多通貨UI（Horizon標準）
- 既存実装を利用:
  - `sections/header.liquid`
  - `snippets/localization-form.liquid`
- 先に行う管理画面設定:
  - Markets: US/HK/IT
  - Languages: EN/DE/FR/IT/ES/ZH-TW/KO
  - 自動判定有効 + 手動切替許可

## 3) 市場公開制御（Shopify標準）
- 方針:
  - 商品/コレクションの公開可否は `Markets/Catalog` を正本にする
  - テーマ側で `available_country_codes` 判定は持たない
- 実装:
  - `sections/main-collection.liquid` の独自市場ガードを削除
  - `sections/product-information.liquid` の独自市場ガードを削除
- 補足:
  - 非公開対象へのアクセス挙動はShopify標準（Markets/Catalog設定）に委譲する

## 4) ここからすぐ着手する作業（次アクション）
- ページ本文をENで先に確定:
  - Trade（申込導線/審査条件）
  - Support & FAQ（1ページ完結）
- コレクション本文を3種で作成:
  - All rugs / Custom rugs / Stock rugs
- ナビゲーション接続:
  - `Custom order rugs / In-stock rugs / About / Trade / Support & FAQ`

## 5) DoD（アプリ導入前）
- US/HK/ITで言語/通貨の自動判定 + 手動変更が動作
- ヘッダーから主要ページに1クリック遷移できる
- 非公開対象へのアクセス挙動がShopify標準どおりである
- About/Trade/Supportの英語本文が公開できる品質で存在する
