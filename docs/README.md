# ドキュメント運用ガイド

## 目的
この `docs` 配下は、テーマ開発の共通情報を集約するための場所です。

## ファイル一覧
- `PROJECT_FOUNDATION_JP.md`: 商品・要件・運用情報を管理する基盤ドキュメント
- `PRODUCT_MASTER_TEMPLATE.csv`: 商品情報入力用テンプレート
- `POC_IMPLEMENTATION_PLAN.md`: PoC向けの実装タスク分解（FR単位）
- `SITE_STRUCTURE_IA.md`: サイト構造・ページ構成・ヘッダー導線の定義
- `REFERENCE_SITE_NORDIC_KNOTS.md`: 参考サイト（Nordic Knots）の構造分析と転用ポイント
- `TEST_MATRIX_PROPOSAL.md`: 実行用テストマトリクス提案
- `PHASE1_BUILD_ORDER.md`: アプリ後回しで進める実装順（着手ガイド）
- `ADMIN_SETUP_CHECKLIST.md`: 管理画面で実施する初期設定チェックリスト
- `NEW_STORE_SETUP_PLAYBOOK.md`: 別ストア接続時の再セットアップ手順（実行順）
- `GITHUB_SHOPIFY_WORKFLOW.md`: GitHub連携と日次運用の手順
- `EXECUTION_STATUS.md`: 実装進捗、残タスク、依存関係の最新状態
- `CODEX_SHOPIFY_AI_TOOLKIT_RUNBOOK.md`: Codex + Shopify AI Toolkit の導入状態と運用手順

## 更新ルール（推奨）
- 要件が変わったら、まず `PROJECT_FOUNDATION_JP.md` を更新する
- 新商品の投入前に、`PRODUCT_MASTER_TEMPLATE.csv` を最新状態にする
- 仕様確定事項は「決定ログ」に日付付きで追記する
- 実装/設定の進捗に変化があったら、`EXECUTION_STATUS.md` を更新する

## 次に進むための最低タスク
1. 既存のサイズオーダーアプリとB2Bアプリの利用範囲・設定項目を確定
2. `POC_IMPLEMENTATION_PLAN.md` の順で PoC 実装を着手
3. `PRODUCT_MASTER_TEMPLATE.csv` をPoC対象商品の実データで埋める
