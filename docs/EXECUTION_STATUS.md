# 実行ステータス（常時更新）

最終更新日: 2026-04-11  
対象ブランチ: `develop`  
運用ルール: 進捗に変化があったら本ファイルを更新する

## 1. 現在の要約
- GitHub連携フローでテーマ反映を運用中
- Phase 1のPDP骨格（Nordic寄せ）は実装済み
- GitHub統合テーマのJSONバリデーション制約により、PDP詳細文言は一時的に静的文言で運用中

## 2. ステータス凡例
- `DONE`: 完了
- `IN_PROGRESS`: 進行中
- `BLOCKED`: 依存待ち
- `TODO`: 未着手

## 3. タスク状況（2026-04-11時点）

### FR-09 / IA・基盤
- `DONE` IAテンプレート分離
  - `collection.*` / `product.*` / `page.*` の専用テンプレート作成済み
- `DONE` ヘッダー導線（メニュー構成）
- `DONE` 国別直リンクガード（利用不可メッセージ表示）

### FR-01 / FR-02 多言語・多通貨
- `IN_PROGRESS` Markets / 言語設定
  - US/HK/IT + 言語有効化は着手済み
  - Shopify Payments未有効のため現地通貨表示の最終検証は未完了
- `BLOCKED` 通貨ローカライズ最終確認
  - 依存: クライアント側でShopify Payments有効化

### FR-06 / FR-10 商品ページ必須表示
- `IN_PROGRESS` Phase 1 PDP骨格
  - `DONE` 左ギャラリー固定、PC画像1列化
  - `DONE` CTA（Sample/Consultation）追加
  - `DONE` Accordion 4項目追加
  - `DONE` 下部レコメンド除外
  - `DONE` Custom/Stock共通テンプレート運用
- `BLOCKED` メタフィールド連動再導入
  - 現在は静的文言で同期安定化
  - 依存: 管理画面でPDP用メタフィールド定義

### FR-11 計測
- `TODO` 最小イベント計測実装
  - `page_view`, `collection_view`, `product_view`, `add_to_cart`, `begin_checkout`

## 4. 直近の対応履歴（抜粋）
- `DONE` GitHub + Shopify連携運用を確立
- `DONE` GitHub統合テーマ同期エラーを解消
  - JSON内の動的ソース制約へ対応
- `DONE` PDP画像をPCで縦1列表示に変更

## 5. 依存タスク（ユーザー側）
- `TODO` Productメタフィールド定義（必須）
  - `custom.pdp_materials` (multi_line_text_field)
  - `custom.pdp_care` (multi_line_text_field)
  - `custom.pdp_size_guide` (multi_line_text_field)
  - `custom.pdp_shipping_returns` (multi_line_text_field)
- `TODO` Shopify Payments有効化（通貨最終検証に必要）

## 6. 次アクション（担当別）
1. Assistant
- メタフィールド定義完了後、JSON依存を避けたLiquid実装でPDP詳細文言の動的連動を再導入
- FR-11の最小計測を実装

2. User
- 管理画面でPDPメタフィールド4種を作成
- Shopify Payments有効化可否をクライアントと調整
