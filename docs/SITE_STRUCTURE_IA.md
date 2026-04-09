# RUGHAUS GL サイト構造・ページ構成（IA）

最終更新日: 2026-04-09
対象: Shopify Horizon テーマ（新規ストア / Shopify Advanced）

## 1. ページ構成（確定案）
- Top
- Collection page 1: All rugs
- Collection page 2: Custom rugs
- Collection page 3: Stock rugs
- Product page 1: Custom rug
- Product page 2: Stock rug
- About page
- Trade page
- Support & FAQ page

## 2. ヘッダー構成（確定案）
- Custom order rugs
- In-stock rugs
- About
- Trade
- Support & FAQ
- Language / Currency select
- Cart

## 3. Shopify実装マッピング（推奨）
- Top: `templates/index.json`
- Collection: `templates/collection.json`（コレクションハンドルで出し分け）
  - `/collections/all-rugs`
  - `/collections/custom-rugs`
  - `/collections/stock-rugs`
- Product:
  - `templates/product.custom-rug.json`
  - `templates/product.stock-rug.json`
- Pages:
  - `/pages/about`
  - `/pages/trade`
  - `/pages/support-faq`

## 4. ナビゲーション設計方針
- Primary navigation: `Custom order rugs / In-stock rugs / About / Trade / Support & FAQ`
- Utility navigation: `Language / Currency select / Cart`
- ローンチ時から対応言語（EN/DE/FR/IT/ES/ZH-TW/KO）で表示可能にする
- 通貨は国選択UIに連動して切替（USD/EUR/KRW/TWD/HKD）

## 5. コレクションと商品の役割
- All rugs: 全ラグのハブコレクション
- Custom rugs: サイズオーダー対象商品を集約
- Stock rugs: 在庫販売商品を集約
- Product template custom-rug: サイズオーダーUI（Live Product Options）を表示
- Product template stock-rug: 通常バリエーション販売UIを表示

## 6. URL/ハンドル命名ルール（推奨）
- Collection handles:
  - `all-rugs`
  - `custom-rugs`
  - `stock-rugs`
- Page handles:
  - `about`
  - `trade`
  - `support-faq`
- Product handles:
  - 英語スラッグで統一（例: `wool-flatweave-rug-001`）

## 7. IA確定事項（2026-04-09）
- All rugsにはCustom rugsとStock rugsの商品を重複表示する
- Tradeページは申し込みページとして誰でも閲覧可能とする
- Support & FAQは1ページ完結で運用する
- Product page 2は「Product page 2（Stock rug）」として運用する

## 8. 受け入れチェック（IA）
- ヘッダーメニューから全主要ページへ1クリックで遷移できる
- Top以外の全ページにパンくずまたは現在地把握UIがある
- 国選択で通貨が切り替わり、遷移後も状態が維持される
- Custom rug商品でのみサイズオーダーUIが表示される
- Stock rug商品でサイズオーダーUIが表示されない
