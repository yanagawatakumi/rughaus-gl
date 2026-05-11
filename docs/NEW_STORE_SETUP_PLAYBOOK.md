# New Store Setup Playbook (RUGHAUS GL)

最終更新日: 2026-04-13  
対象: 別Shopifyストアへ同テーマを接続して再構築する作業

## 0. 事前確認（必須）
- 新ストアのAdminにログインしていること
- `Online Store` のテーマ編集権限があること
- 初回販売前で、通貨・決済設定の変更が可能な状態であること
- 接続先リポジトリ: `yanagawatakumi/rughaus-gl`
- 接続ブランチ: `develop`（検証用）
- ストアドメイン運用:
  - テーマ/画面確認: `rughaus-gl.myshopify.com`
  - `shopify store auth/execute`: `xfxfwd-8p.myshopify.com`（恒久ドメイン）

## 0-1. CLIストア認証（任意だが推奨）
```bash
shopify store auth --store xfxfwd-8p.myshopify.com --scopes read_products,read_inventory,write_products,write_inventory
shopify store execute --store xfxfwd-8p.myshopify.com --query "query { shop { name primaryDomain { url } } }"
```

補足:
- `OAuth callback store does not match the requested store` が出た場合は、表示された恒久ドメインで再実行する

## 1. GitHubテーマ接続
1. `Online Store > Themes > Add theme > Connect from GitHub`
2. `yanagawatakumi/rughaus-gl` を選択
3. `develop` を選択して接続
4. テーマログでエラーなしを確認

完了条件:
- GitHub統合テーマとして `develop` が表示される
- プレビューでテーマが表示できる

## 2. ストア基本設定
1. `Settings > Store details > Store currency` を `USD` に設定（未販売時のみ）
2. `Settings > Checkout` の必須項目を初期設定
3. `Online Store > Preferences` でパスワード保護状態を確認

失敗時の分岐（重要）:
- `Store currency` が変更できない場合は、以下を確認する
  - 自分が `Store owner` もしくは通貨変更可能な権限を持つか
  - すでに注文が発生していないか（販売開始後は基準通貨変更不可）
  - Shopify Payments設定の途中状態でロックされていないか
- 解決できない場合は、`Store owner` に実施依頼する

完了条件:
- 基準通貨がUSDになっている

## 3. Markets / Languages（実作業手順）
### 3-1. Marketsを有効化する
1. `Settings > Markets` を開く
2. `United States` / `Hong Kong SAR` / `Italy` の3市場を有効化する
3. 各Marketを開いて、対象国が正しいことを確認する
4. 各Marketの `通貨` を確認する
- US: USD
- HK: HKD
- IT: EUR

### 3-2. 言語を有効化する
1. `Settings > Languages` を開く
2. `EN/DE/FR/IT/ES/ZH-TW/KO` を追加・公開する
3. `Settings > Markets > (各Market)` を開く
4. `Domain / Language` で、そのMarketに公開する言語を割り当てる

### 3-3. 自動判定（リダイレクト）を有効化する
1. `Settings > Markets` で自動判定設定を開く
2. 国/言語の自動判定をONにする
3. 手動切替が無効になっていないことを確認する

### 3-4. 確認（ここで詰まりやすい）
1. テーマプレビューを開く
2. ヘッダーの言語/通貨セレクタで手動切替できるか確認
3. 切替後に別ページへ移動しても表示が維持されるか確認
4. 通貨が切り替わらない場合は、`Shopify Payments有効化前` の可能性を確認

完了条件:
- 自動判定 + 手動切替が両方動作する
- 主要ページ遷移後も言語/通貨表示が維持される

## 4. コンテンツ作成とテンプレート割当（画面別）
### 4-1. コレクション
1. `Products > Collections > Create collection` で以下を作成
- `all-rugs`
- `custom-rugs`
- `stock-rugs`
2. 各コレクション編集画面の `Theme template` で割当
- `all-rugs` -> `collection.all-rugs`
- `custom-rugs` -> `collection.custom-rugs`
- `stock-rugs` -> `collection.stock-rugs`

### 4-2. 固定ページ
1. `Online Store > Pages > Add page` で以下を作成
- `about`
- `trade`
- `support-faq`
2. 各ページ編集画面の `Template` で割当
- `about` -> `page.about`
- `trade` -> `page.trade`
- `support-faq` -> `page.support-faq`

### 4-3. 商品テンプレート
1. `Products > (商品) > Theme template` を開く
2. 商品タイプごとに割当
- サイズオーダー商品 -> `product.custom-rug`
- 既製品商品 -> `product.stock-rug`

完了条件:
- コレクション/ページ/商品で期待テンプレートが表示される

## 5. ナビゲーション（Main menu）
1. `Online Store > Navigation > Main menu` を開く
2. 既存項目を整理し、次の順で登録する
- `Custom order rugs` -> `/collections/custom-rugs`
- `In-stock rugs` -> `/collections/stock-rugs`
- `About` -> `/pages/about`
- `Trade` -> `/pages/trade`
- `Support & FAQ` -> `/pages/support-faq`
3. 保存後、テーマプレビューでヘッダー導線を確認する

完了条件:
- ヘッダーから主要ページへ1クリックで遷移できる

## 6. 商品メタフィールド定義（PDP必須）
1. `Settings > Custom data > Products > Add definition` を開く
2. 以下4項目を個別に作成する（namespace: `custom`）
- Name: `PDP materials` / Key: `pdp_materials` / Type: `Multi-line text`
- Name: `PDP care` / Key: `pdp_care` / Type: `Multi-line text`
- Name: `PDP size guide` / Key: `pdp_size_guide` / Type: `Multi-line text`
- Name: `PDP shipping returns` / Key: `pdp_shipping_returns` / Type: `Multi-line text`
3. テスト商品に値を入力してPDPを確認する

完了条件:
- アコーディオン4項目がメタフィールド値で表示される
- 未入力時はフォールバック文言が表示される

## 7. 公開制御（Markets/Catalogを正本にする）
1. `Settings > Markets > (各Market) > Catalog` を開く
2. 市場ごとに公開する商品/コレクションを設定する
3. 非公開対象のURLアクセス挙動を確認する
4. `available_country_codes` などの独自メタフィールドは作成しない

完了条件:
- 公開/非公開の挙動がMarkets/Catalog設定と一致する

## 8. 決済・配送（多通貨検証の前提）
### 8-1. 決済
1. `Settings > Payments` を開く
2. Shopify Paymentsを有効化する
3. 必要に応じてテストモードを有効化する

### 8-2. 配送
1. `Settings > Shipping and delivery` を開く
2. US/HK/IT向けの送料プロファイルを作成する
3. 各Marketの配送可否と送料を確認する

完了条件:
- 多通貨表示とチェックアウト通貨の整合検証が可能

## 9. アプリ再設定（後続）
1. `Settings > Apps and sales channels` からインストール
- Matrixify
- B2B BSS
- Live Product Options
2. 旧ストアと同等の設定に揃える
3. アプリ有効後、商品ページ表示崩れがないか確認する

完了条件:
- 旧ストア要件を新ストアで再現できる設定状態になる

## 10. 最終確認（最小スモークテスト）
1. 言語切替: EN/DE/FR/IT/ES/ZH-TW/KO
2. 通貨切替: USD/EUR/HKD（必要通貨を追加）
3. PDP: アコーディオン、CTA、画像切替、カート投入
4. About/Trade/Support: テンプレート反映
5. 市場公開制御: 非公開対象アクセス挙動

完了条件:
- 1〜5がすべて問題なく再現できる

## 運用メモ
- 開発は `develop` 接続テーマで継続する
- 本番化時のみ `main` 接続テーマを作成する
- 進捗が変わったら `EXECUTION_STATUS.md` を更新する
