# 実行ステータス（常時更新）

最終更新日: 2026-04-13  
対象ブランチ: `develop`  
運用ルール: 進捗に変化があったら本ファイルを更新する

## 1. 現在の要約
- GitHub連携フローでテーマ反映を運用中
- Phase 1のPDP骨格（Nordic寄せ）は実装済み
- Markets/Catalogを公開制御の正本に統一し、テーマ側の独自市場ガードを撤廃
- PDP詳細文言はLiquid実装で `custom.pdp_*` 連動 + フォールバック表示に移行済み

## 2. ステータス凡例
- `DONE`: 完了
- `IN_PROGRESS`: 進行中
- `BLOCKED`: 依存待ち
- `TODO`: 未着手

## 3. タスク状況（2026-04-13時点）

### FR-09 / IA・基盤
- `DONE` IAテンプレート分離
  - `collection.*` / `product.*` / `page.*` の専用テンプレート作成済み
- `DONE` ヘッダー導線（メニュー構成）
- `DONE` Markets/Catalog正本運用へ移行（テーマ側の国別直リンクガードを削除）
- `DONE` About / TradeをNK寄せの専用ページセクションへ更新（Phase 1骨格）

### FR-01 / FR-02 多言語・多通貨
- `IN_PROGRESS` Markets / 言語設定
  - US/HK/IT + 言語有効化は着手済み
  - Shopify Payments未有効のため現地通貨表示の最終検証は未完了
- `BLOCKED` 通貨ローカライズ最終確認
  - 依存: クライアント側でShopify Payments有効化

### FR-06 / FR-10 商品ページ必須表示
- `IN_PROGRESS` Phase 1 PDP骨格
  - `DONE` 左ギャラリー固定、PC画像1列化
  - `DONE` PCスクロール挙動を調整（右カラム高さを基準に「限界到達で固定」する挙動へ更新）
  - `DONE` CTA（Sample/Consultation）追加
  - `DONE` Accordion 4項目追加
  - `DONE` 下部レコメンド除外
  - `DONE` Custom/Stock共通テンプレート運用
  - `DONE` `custom.pdp_*` をLiquidで参照する動的連動を再導入（JSON動的ソース依存なし）
  - `IN_PROGRESS` 管理画面でメタフィールド定義後の実データ投入

### FR-11 計測
- `TODO` 最小イベント計測実装
  - `page_view`, `collection_view`, `product_view`, `add_to_cart`, `begin_checkout`

## 4. 直近の対応履歴（抜粋）
- `DONE` GitHub + Shopify連携運用を確立
- `DONE` GitHub統合テーマ同期エラーを解消
  - JSON内の動的ソース制約へ対応
- `DONE` PDP画像をPCで縦1列表示に変更
- `DONE` PDPのPCスクロール挙動を再調整（右カラム高さ計測JS + sticky位置計算）
- `DONE` Accordion開閉時の右カラム再計算を追加（固定中の高さ変化に追従）
- `DONE` スクロール方向に応じた固定モード切替を追加（下方向=下限固定、上方向=上限固定）
- `DONE` 方向反転時のジャンプを抑制（sticky位置を連続補間する方式へ更新）
- `DONE` 管理画面の商品説明をPDP右カラムへ追加（アコーディオン直上）
- `DONE` Sample/Consultation CTAをAdd to cart直下へ移動
- `DONE` About/Trade専用セクションのschema修正（range上限値）により同期エラーを解消
- `DONE` Aboutページで`page.about`テンプレート反映を実確認
- `DONE` `sections/main-collection.liquid` / `sections/product-information.liquid` から独自市場ガードを削除
- `DONE` `blocks/_accordion-row.liquid` にPDPメタフィールド連動ロジックを追加
- `DONE` `rughaus.pdp.*` 翻訳キー参照の構造を全ロケールで正規化

## 5. 依存タスク（ユーザー側）
- `TODO` Productメタフィールド定義（必須）
  - `custom.pdp_materials` (multi_line_text_field)
  - `custom.pdp_care` (multi_line_text_field)
  - `custom.pdp_size_guide` (multi_line_text_field)
  - `custom.pdp_shipping_returns` (multi_line_text_field)
- `TODO` Shopify Payments有効化（通貨最終検証に必要）
- `TODO` Tradeページのテンプレート割当確認
  - Tradeページ: `page.trade`

## 6. 次アクション（担当別）
1. Assistant
- FR-11の最小計測を実装

2. User
- 管理画面でPDPメタフィールド4種を作成
- Shopify Payments有効化可否をクライアントと調整
