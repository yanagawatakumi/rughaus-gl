# RUGHAUS GL PoC 実装タスク分解（v0.3）

最終更新日: 2026-04-09
対象: フェーズ1（国内ストア内の別テーマPoC）

## 1. 目的
- 要件で定義した `FR-01` 〜 `FR-06` を、最短で検証可能な実装順に分解する
- 標準機能を優先し、不足分のみテーマ実装で補う

## 2. 実装スコープ
- 重点対象国: US / HK / IT
- 広告検証流入: その他の国も受け入れて比較計測
- 対象通貨: USD / EUR / KRW / TWD / HKD
- 対応言語: EN / DE / FR / IT / ES / ZH-TW / KO
- 対象商材: サイズオーダーラグ（比率 1:1 / 2:3 / 自由）

## 3. FR別タスク

### FR-01 / FR-02: 多通貨・多言語（自動判定 + 手動切替）
- 管理画面タスク
  - Shopify Marketsで US / HK / IT を有効化
  - 各Marketに通貨を割り当てる
  - ローンチ対応言語（EN / DE / FR / IT / ES / ZH-TW / KO）を有効化
  - Translate & Adapt導入
  - 自動判定/リダイレクト設定を有効化（不一致時はユーザー手動変更を優先）
- テーマタスク
  - ヘッダー/フッターで language/country selector 表示位置を確定
  - 自動判定された言語/通貨が初期表示されることを確認
  - 手動変更した言語/通貨が主要導線に反映されることを確認
  - 対応言語の表示品質チェック（文法/可読性/欠損）
- 主な確認対象ファイル
  - `snippets/localization-form.liquid`
  - `assets/localization.js`
  - `sections/header.liquid`
  - `sections/footer.liquid`
  - `locales/*.json`

### FR-03: 国別の表示・非表示制御（優先: コレクション単位）
- 管理画面タスク
  - Markets + Catalogでコレクション公開範囲を国別設定
  - 余力があれば商品単位の公開制御も検証
- テーマタスク
  - コレクション未公開時の導線（非表示 / 404回避 / 代替導線）確認
  - 直リンクアクセス時に利用不可メッセージを表示
  - ナビゲーションに非公開コレクションが露出しないことを確認
- 実装メモ
  - Markets標準挙動では、対象国で販売不可の商品へのアクセスはホームへリダイレクトされる
  - 直リンクでメッセージ表示を必須にする場合は、Markets公開制御のみでなくテーマ側ガード実装を併用する
- 主な確認対象ファイル
  - `sections/main-collection.liquid`
  - `sections/header.liquid`
  - `snippets/header-drawer.liquid`

### FR-04: サイズオーダーラグ（メタオブジェクト + 計算UI）
- データ設計タスク
  - メタオブジェクト定義（例: `rug_size_order_rule`）
  - 必須項目: 比率タイプ、最小寸法、最大寸法、単価、単位、注意文
  - 商品メタフィールドにメタオブジェクト参照を保持
- アプリ導入タスク
  - Live Product Options を導入し、上記データ構造との対応表を作成
  - 商品テンプレートへの埋め込み方法（App block / App embed / snippet）を確定
- UI実装タスク
  - 比率 1:1 / 2:3 / 自由 の入力UI
  - 固定比率: 縦入力で横を自動算出
  - 自由入力: 縦横を入力
  - 単位切替: cm / inch（国または手動切替に連動）
  - 面積単価計算: 単価 x 面積、端数は四捨五入
  - 入力刻み: 5cm / 2inch
  - バリデーション: 最小寸法 / 最大寸法（メタオブジェクト値を参照）
- 実課金タスク（必須）
  - サイズオーダーアプリで確定した基準価格がカート/チェックアウトへ正しく反映されることを検証
  - LPO追加料金が隠し商品行として正しく生成されることを検証
  - チェックアウト金額と商品ページ算出額の一致をE2Eで検証
- 主な確認対象ファイル（候補）
  - `sections/product-information.liquid`
  - `snippets/product-information-content.liquid`
  - `blocks/product-custom-property.liquid`
  - `assets/product-custom-property.js`
  - `assets/product-form.js`

### FR-05: コレクションのカラースウォッチ + 画像切替
- テーマタスク
  - カラーオプションをスウォッチとして一覧表示
  - スウォッチ選択時に対応バリアント画像へ切替
  - カードリンクURLを選択バリアントへ同期
- 主な確認対象ファイル
  - `snippets/variant-swatches.liquid`
  - `snippets/product-card.liquid`
  - `assets/product-card.js`
  - `assets/variant-picker.js`

### FR-06: 全商品ページの必須表示（納期・注意文・返品条件）
- データ設計タスク
  - 商品メタフィールドを定義（納期、注意文、返品条件）
  - 共通文言オブジェクト（例: `product_policy_shared`）を定義
  - 商品メタフィールドから共通オブジェクト参照を可能にする
- テーマタスク
  - 商品ページ内に必須表示ブロックを追加
  - 商品固有文言が空の場合は共通参照を表示
- 主な確認対象ファイル（候補）
  - `sections/product-information.liquid`
  - `snippets/product-information-content.liquid`
  - `blocks/product-description.liquid`

### FR-07: 翻訳品質保証（未翻訳ゼロ）
- 管理画面タスク
  - Translate & Adaptを基準に翻訳投入
  - 不足箇所は翻訳カバレッジの高いアプリのみ採用
- 品質タスク
  - 一覧/詳細/カート/チェックアウト導線/エラー表示/通知表示を全件確認
  - ローンチ対応言語で未翻訳ゼロになるまで修正

### FR-08: 法人向け20%OFF（表示 + 実課金）
- 実装方針
  - 価格ロジックは「通常価格 + LPO追加料金」を基準とし、最後に20%OFFを適用する
  - 割引適用は通常チェックアウトではなく、ドラフト経由のフローで反映する
  - 割引適用ポイントは1系統に固定し、カタログ価格調整と重複適用しない
- アプリ導入タスク
  - B2B BSS を導入し、20%OFF適用条件（初期は顧客タグ）を確定
  - サイズオーダーアプリとの併用時に割引対象外にならないことを確認
- テーマタスク
  - 商品ページ/一覧で通常価格と20%OFF価格を並行表示
  - サイズオーダー入力変更時に2価格を同時更新
- 課金タスク
  - ドラフト経由チェックアウトで20%OFF価格が課金されることを保証
  - サイズオーダー商品の課金額が表示計算と一致することを保証
- 主な確認対象ファイル（候補）
  - `sections/product-information.liquid`
  - `snippets/product-information-content.liquid`
  - `assets/product-custom-property.js`
  - `assets/product-form.js`

### FR-09: IA/ナビゲーション実装
- 情報設計タスク
  - `SITE_STRUCTURE_IA.md` に沿ってページ、テンプレート、URLハンドルを確定
  - Collection/Product/Pageの役割分担を反映
  - All rugsにCustom rugs/Stock rugs商品を重複表示する
  - Tradeページは誰でも閲覧可能な申し込みページとして運用する
  - Support & FAQは1ページ完結で構成する
- テーマタスク
  - ヘッダーメニューを `Custom order rugs / In-stock rugs / About / Trade / Support & FAQ` に設定
  - Utilityに `Language/Currency select` と `Cart` を配置
  - Top/Collection/Product/Page間の導線を最短化
- 主な確認対象ファイル（候補）
  - `sections/header.liquid`
  - `sections/main-collection.liquid`
  - `sections/product-information.liquid`
  - `templates/index.json`
  - `templates/collection.json`
  - `templates/product.json`

### FR-10: Custom商品運用ルール実装
- テーマタスク
  - Custom商品ページに「返品不可」「キャンセル不可」「納期遅延時の対応」を必須表示
  - 上記ポリシー文言をカート前に確認できる導線を配置
- 主な確認対象ファイル（候補）
  - `sections/product-information.liquid`
  - `snippets/product-information-content.liquid`
  - `blocks/product-description.liquid`

### FR-11: 計測基盤（一般初期値）
- 実装タスク
  - GA4を基準に計測を設定
  - 広告流入はUTMで識別
  - 最低限イベントを実装: `page_view`, `collection_view`, `product_view`, `size_input`, `add_to_cart`, `begin_checkout`, `purchase`, `trade_form_submit`
- 主な確認対象ファイル（候補）
  - `layout/theme.liquid`
  - `snippets/scripts.liquid`
  - `assets/events.js`

## 4. 推奨着手順
1. Matrixifyで商品/メタフィールドの初期入出力フォーマットを確定
2. Markets / 言語 / 通貨 / 翻訳基盤の有効化（FR-01, FR-02）
3. 国別公開制御のPoC（まずコレクション単位でFR-03）
4. Live Product Options 前提でサイズオーダーのデータモデル確定（FR-04）
5. サイズオーダーUI + 価格計算実装（FR-04）
6. コレクションのスウォッチ連動確認と不足修正（FR-05）
7. 商品ページの必須表示実装（FR-06）
8. B2B BSS 導入と20%OFF適用条件の確定（FR-08）
9. IA定義に沿ったページ構成/ヘッダー導線を実装（FR-09）
10. Custom商品運用ルールの表示実装（FR-10）
11. 計測基盤の初期実装（FR-11）
12. 法人20%OFFの表示と課金一致をE2E検証（通常商品 + サイズオーダー）
13. US/HK/IT 3市場で受注E2E検証

## 5. 受け入れテスト観点（最小）
- T-01: US/HK/ITで価格表示通貨と決済通貨が正しい
- T-01a: 自動判定通貨の初期表示が有効で、手動切替後も一覧/詳細/カート/チェックアウトで一貫する
- T-02: 自動判定言語の初期表示が有効で、手動切替後も主要導線で表示破綻がない
- T-03: 国別に非公開のコレクションが見えない
- T-03a: 非公開対象への直リンク時に利用不可メッセージが表示される
- T-04: サイズオーダー（1:1/2:3/自由）で価格が計算されカート投入できる
- T-04x: LPO追加料金が隠し商品行として期待どおり生成される
- T-04a: 算出価格とチェックアウト金額が一致する
- T-05: スウォッチ選択で一覧カード画像とリンク先バリアントが一致する
- T-06: 納期/注意文/返品条件が全商品ページで表示される
- T-07: ローンチ対応言語の対象範囲で未翻訳文言が残らない
- T-08: 通常商品で通常価格/20%OFF価格の表示と課金が一致する
- T-09: サイズオーダー商品で算出基準価格 -> 20%OFF -> 課金額が一致する
- T-10: Advancedプラン環境で、サイズオーダーアプリ + B2Bアプリ併用時に価格不整合が起きない
- T-11: IA定義どおりにページ構成とヘッダー導線が実装されている
- T-12: 顧客タグ条件で20%OFFが適用され、国条件なしで再現する
- T-13: Custom商品で返品不可/キャンセル不可/遅延時対応文言が必須表示される
- T-14: 最低限イベント計測が発火する（page_view ~ trade_form_submit）

詳細マトリクスは `TEST_MATRIX_PROPOSAL.md` を参照。

## 6. 保留事項
- なし（2026-04-09時点で確定済み）
  - 面積単価の内部基準単位: m2
  - 自由入力の刻み: 5cm または 2inch

## 7. 利用アプリ（暫定）
- Matrixify
- B2B BSS（卸売用）
- Live Product Options（サイズオーダー）

## 8. 現時点の技術懸念（優先順）
- C-01（高）: FR-04の実課金連動
  - 理由: アプリ側価格計算とチェックアウト課金の同期確認が必要
  - 対策: 先にアプリ連携PoCを実施し、価格一致E2Eを最優先で通す
- C-02（中）: FR-03の直リンク時の表示整合
  - 理由: Markets制御とテーマ導線制御を両立させる必要がある
  - 対策: 非公開時の表示テンプレートとナビ露出制御を同時実装
- C-03（中）: FR-07の翻訳品質保証
  - 理由: テーマ外文言やアプリ文言で翻訳漏れが発生しやすい
  - 対策: 翻訳対象の監査チェックリストを作成し、リリースゲート化
- C-04（中）: FR-08の二重割引・割引漏れ
  - 理由: カタログ価格調整、割引機能、手動表示計算が重複すると不整合が起きる
  - 対策: 割引適用ポイントを1系統に固定し、E2Eで表示額と課金額を照合
- C-05（中）: アプリ間干渉
  - 理由: サイズオーダーアプリとB2Bアプリの適用順序により割引対象額が変わる可能性がある
  - 対策: 適用順序を仕様化し、主要ケースで回帰テストを固定化
- C-06（中）: ドラフト経由フロー差分
  - 理由: 通常チェックアウトとドラフト経由で挙動差が出る可能性がある
  - 対策: B2B対象/非対象の両フローで価格・税・配送を比較検証する
