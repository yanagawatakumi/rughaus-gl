# New Store Setup Playbook (RUGHAUS GL)

最終更新日: 2026-04-13  
対象: 別Shopifyストアへ同テーマを接続して再構築する作業

## 0. 事前確認（必須）
- 新ストアのAdminにログインしていること
- `Online Store` のテーマ編集権限があること
- 初回販売前で、通貨・決済設定の変更が可能な状態であること
- 接続先リポジトリ: `yanagawatakumi/rughaus-gl`
- 接続ブランチ: `develop`（検証用）

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

完了条件:
- 基準通貨がUSDになっている

## 3. Markets / Languages
1. `Settings > Markets` で `United States / Hong Kong SAR / Italy` を有効化
2. 各Marketの通貨を確認（US: USD, HK: HKD, IT: EUR）
3. `Settings > Languages` で `EN/DE/FR/IT/ES/ZH-TW/KO` を有効化
4. Marketsの `Domain / Language` で公開言語を割り当て
5. 国/言語の自動判定（リダイレクト）を有効化
6. ヘッダーの言語/通貨セレクタで手動切替を確認

完了条件:
- 自動判定 + 手動切替の両方が動作
- 主要ページで言語/通貨の表示が維持される

## 4. コンテンツとテンプレート割当
1. `Products > Collections` で以下を作成
- `all-rugs`
- `custom-rugs`
- `stock-rugs`
2. 各コレクションにテンプレートを割当
- `all-rugs` -> `collection.all-rugs`
- `custom-rugs` -> `collection.custom-rugs`
- `stock-rugs` -> `collection.stock-rugs`
3. `Online Store > Pages` で以下を作成
- `about`
- `trade`
- `support-faq`
4. 各ページにテンプレートを割当
- `about` -> `page.about`
- `trade` -> `page.trade`
- `support-faq` -> `page.support-faq`
5. 商品テンプレートを割当
- サイズオーダー商品 -> `product.custom-rug`
- 既製品 -> `product.stock-rug`

完了条件:
- 主要コレクション/ページ/商品でテンプレートが意図どおり反映

## 5. ナビゲーション
1. `Online Store > Navigation > Main menu` を編集
2. 次の順でメニューを設定
- `Custom order rugs` -> `/collections/custom-rugs`
- `In-stock rugs` -> `/collections/stock-rugs`
- `About` -> `/pages/about`
- `Trade` -> `/pages/trade`
- `Support & FAQ` -> `/pages/support-faq`

完了条件:
- ヘッダーから主要導線へ1クリック遷移できる

## 6. 商品メタフィールド定義（PDP必須）
1. `Settings > Custom data > Products > Add definition`
2. 次の4項目を作成（namespace: `custom`）
- `pdp_materials` (`multi_line_text_field`)
- `pdp_care` (`multi_line_text_field`)
- `pdp_size_guide` (`multi_line_text_field`)
- `pdp_shipping_returns` (`multi_line_text_field`)
3. テスト商品に値を入力してPDPで反映確認

完了条件:
- PDPアコーディオン4項目がメタフィールド値で表示される
- 未入力時はフォールバック文言が表示される

## 7. 公開制御（Markets/Catalog正本）
1. `Settings > Markets` のCatalog設定で公開対象を管理
2. 非公開商品/コレクションのアクセス挙動を確認
3. テーマ側の独自制御用メタフィールドは作成しない

完了条件:
- 公開可否の挙動がMarkets/Catalog設定と一致する

## 8. 決済/配送（課金検証前提）
1. `Settings > Payments` で Shopify Payments を有効化
2. テストモード（必要なら）を有効化
3. `Settings > Shipping and delivery` でUS/HK/IT配送設定を作成

完了条件:
- 多通貨表示とチェックアウト通貨の整合検証が可能

## 9. アプリ再設定（後続）
- Matrixify
- B2B BSS
- Live Product Options

完了条件:
- 旧ストアと同じ要件で再現できる設定状態

## 10. 最終確認（最小）
- 言語切替: EN/DE/FR/IT/ES/ZH-TW/KO
- 通貨切替: USD/EUR/HKD（+必要通貨）
- PDP表示: アコーディオン、CTA、画像切替、カート投入
- Trade/About/Supportテンプレート表示
- 市場公開制御の挙動確認

## 運用メモ
- 開発は `develop` 接続テーマで継続する
- 本番化時のみ `main` 接続テーマを作成する
- 進捗が変わったら `EXECUTION_STATUS.md` を更新する
