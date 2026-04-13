# 実行ステータス（常時更新）

最終更新日: 2026-04-13  
対象ブランチ: `develop`  
運用ルール: 進捗に変化があったら本ファイルを更新する

## 1. 現在の要約
- GitHub連携フローでテーマ反映を運用中
- Phase 1のPDP骨格（Nordic寄せ）は実装済み
- TopページのNK寄せ骨格セクションを実装済み（`sections/home-nk.liquid`）
- Markets/Catalogを公開制御の正本に統一し、テーマ側の独自市場ガードを撤廃
- PDP詳細文言はLiquid実装で `custom.pdp_*` 連動 + フォールバック表示に移行済み
- 別Shopifyストアへの接続・再セットアップフェーズに移行
- Codex 開発環境へ Shopify AI Toolkit（MCP + skills + CLI更新）を反映済み

## 2. ステータス凡例
- `DONE`: 完了
- `IN_PROGRESS`: 進行中
- `BLOCKED`: 依存待ち
- `TODO`: 未着手

## 3. タスク状況（2026-04-13時点）

### New Store 再セットアップ
- `IN_PROGRESS` 別ストア再構築
- `DONE` GitHubテーマ接続（`develop`）確認
- `DONE` 新ストア基準通貨USDの確認
- `DONE` Markets/Languages再設定（US/HK/IT + EN/DE/FR/IT/ES/ZH-TW/KO）
- `DONE` Collections/Pages/Productsのテンプレート再割当
- `DONE` Main menu再設定
- `TODO` Product metafield定義（`custom.pdp_*` 4項目）
- `IN_PROGRESS` Markets/Catalog公開設定の再構成
- `BLOCKED` Shopify Payments有効化待ち（多通貨最終検証）
- `NOTE` 2026-04-13 ユーザー完了報告ベース。最終スモークテストは未完了。

### Dev環境（Codex + Shopify AI Toolkit）
- `DONE` Codex の `~/.codex/config.toml` に Shopify Dev MCP 設定を追加
- `DONE` Shopify AI Toolkit skills 導入（theme/app/storefront系）
- `DONE` Shopify CLI `3.93.2` へ更新（`shopify store auth/execute` 利用可）
- `DONE` ストア認証と疎通確認
  - `shopify store auth --store xfxfwd-8p.myshopify.com`
  - `shopify store execute` による `shop` / `products` 取得確認
- `DONE` `shopify theme check --path . --output json` 実行（結果 `[]`）
- `TODO` Storefront MCP 導入検討（AI接客/Storefront Agent 拡張）

### FR-09 / IA・基盤
- `DONE` IAテンプレート分離
  - `collection.*` / `product.*` / `page.*` の専用テンプレート作成済み
- `DONE` ヘッダー導線（メニュー構成）
- `DONE` Markets/Catalog正本運用へ移行（テーマ側の国別直リンクガードを削除）
- `DONE` About / TradeをNK寄せの専用ページセクションへ更新（Phase 1骨格）
- `IN_PROGRESS` TopページをNK寄せ構成へ移行
  - `DONE` `sections/home-nk.liquid` を追加
  - `DONE` Topページを5分割セクションへ再構築
    - `sections/home-nk-hero.liquid`
    - `sections/home-nk-categories.liquid`
    - `sections/home-nk-trending.liquid`
    - `sections/home-nk-story.liquid`
    - `sections/home-nk-support.liquid`
  - `DONE` `templates/index.json` を分割セクション構成へ更新（左カラム並び替え対応）
  - `DONE` `templates/index.json` を `home-nk` 中心構成へ更新
  - `DONE` 日本サイト由来の暫定画像を `assets/home-nk-*` として反映（未設定時フォールバック）
  - `DONE` Top基本レイアウトを左右余白ベースへ調整（About系と同じ考え方）
  - `DONE` Topテキスト崩れ対策を追加（`overflow-wrap` / `min-width: 0`）
  - `DONE` TRENDING RUGS をカルーセル化（横ドラッグ + ループ + 次カードのチラ見せ）
  - `DONE` TRENDING RUGS をTheme Editor運用可能に改修（Collection自動 / Manual blocks 切替）
  - `TODO` 管理画面で最終画像差し替えとトーン調整

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
- `DONE` Codex開発環境に Shopify AI Toolkit を反映（MCP + skills）
- `DONE` `shopify store auth/execute` の実行基盤を整備（CLI更新 + 認証）
- `DONE` ストア実行時の恒久ドメイン運用ルールを確立
  - `store` 系は `xfxfwd-8p.myshopify.com` を使用
  - 表示/テーマ側は `rughaus-gl.myshopify.com` を使用
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
- `DONE` PDPメディア表示をバリアントグループ連動へ更新（代表画像を起点に後続画像を同グループ表示）
- `DONE` バリアント切替体感を改善（レスポンスキャッシュ + hover/focus先読み + ギャラリー切替アニメーション）
- `DONE` TopページのNK寄せセクションを新規実装（Hero/Categories/Featured/Story/Support）
- `DONE` Topページの画像フォールバックを日本サイト由来アセットへ更新
- `DONE` Topページの左右余白と文字折り返し挙動を改善
- `DONE` Top TRENDING RUGS をグリッドからカルーセルへ移行（`snippets/slideshow` 再利用）
- `DONE` Top TRENDING RUGS をブロック駆動へ更新（`featured_product` ブロックで手動運用可）
- `DONE` Topページの主要領域を独立セクション化し、Theme Editor左カラムでセクション順変更可能に更新

## 5. 依存タスク（ユーザー側）
- `TODO` Productメタフィールド定義（必須）
  - `custom.pdp_materials` (multi_line_text_field)
  - `custom.pdp_care` (multi_line_text_field)
  - `custom.pdp_size_guide` (multi_line_text_field)
  - `custom.pdp_shipping_returns` (multi_line_text_field)
- `TODO` Shopify Payments有効化（通貨最終検証に必要）
- `TODO` Markets/Catalogで市場別公開設定を最終化
- `TODO` 新ストア最小スモークテスト実施
  - 手順書: `NEW_STORE_SETUP_PLAYBOOK.md` の「10. 最終確認」

## 6. 次アクション（担当別）
1. Assistant
- FR-11の最小計測を実装
- 新ストアセットアップの確認観点を随時レビュー
- `CODEX_SHOPIFY_AI_TOOLKIT_RUNBOOK.md` の運用更新を継続

2. User
- Productメタフィールド4定義を作成し、テスト商品へ入力
- Shopify Payments有効化後に多通貨表示/決済を再確認
- Markets/Catalog公開制御と最小スモークテスト結果を共有
