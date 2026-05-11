# ドキュメント運用ガイド

最終更新日: 2026-05-11

## 1. まず読む（並列開発の実行順）
1. `PARALLEL_DEVELOPMENT_SOP.md`（実作業の標準手順）
2. `PARALLEL_DEVELOPMENT_BASELINE.md`（運用方針・責任分担）
3. `GITHUB_SHOPIFY_WORKFLOW.md`（GitHub/Shopify連携運用）
4. `AGENT_PROMPT_TEMPLATES.md`（別AIエージェントへの依頼文テンプレート）
5. `AGENT_PARALLEL_ONBOARDING_PROMPT.md`（単独開発エージェントを並列運用へ移行する再開プロンプト）

## 2. 並列開発クイックスタート
- Contributor（実装担当）
  1. `origin/develop` から `codex/<task>-<agent>` を作成
  2. 専用worktreeで作業
  3. `shopify theme check --path . --fail-level error --output json` を通す
  4. `codex/* -> develop` でPR
- Integrator（統合担当）
  1. PR依存関係と競合を確認
  2. 高競合ファイルを含むPRのマージ順を固定
  3. `develop` 統合後、必要に応じて `develop -> main` をPR

## 3. リポジトリ標準ルール
- `develop` / `main` への直接pushは禁止（PR必須）
- Required check は `Theme Check`
- 高競合ファイル:
  - `templates/index.json`
  - `config/settings_data.json`
  - `locales/*`（大量更新時）

## 4. ファイル一覧（用途別）

### 開発運用
- `PARALLEL_DEVELOPMENT_SOP.md`: AIエージェント向け標準作業手順（開始〜PR〜統合）
- `PARALLEL_DEVELOPMENT_BASELINE.md`: 並行開発の方針と最小ガード
- `GITHUB_SHOPIFY_WORKFLOW.md`: GitHub + Shopify連携の日次運用
- `AGENT_PROMPT_TEMPLATES.md`: 別エージェント依頼のコピペテンプレート
- `AGENT_PARALLEL_ONBOARDING_PROMPT.md`: 単独開発の続きから並列運用へ移行する専用プロンプト
- `CODEX_SHOPIFY_AI_TOOLKIT_RUNBOOK.md`: Codex + Shopify AI Toolkit の導入・運用
- `EXECUTION_STATUS.md`: 実装進捗、残タスク、依存関係の最新状態

### 要件・設計・実装計画
- `PROJECT_FOUNDATION_JP.md`: 商品・要件・運用情報の基盤ドキュメント
- `POC_IMPLEMENTATION_PLAN.md`: PoC向けの実装タスク分解（FR単位）
- `PHASE1_BUILD_ORDER.md`: アプリ後回しで進める実装順
- `SITE_STRUCTURE_IA.md`: サイト構造・ページ構成・導線定義
- `REFERENCE_SITE_NORDIC_KNOTS.md`: 参考サイト分析と転用ポイント
- `TEST_MATRIX_PROPOSAL.md`: テストマトリクス提案

### 運用チェックリスト
- `ADMIN_SETUP_CHECKLIST.md`: 管理画面で実施する初期設定チェックリスト
- `NEW_STORE_SETUP_PLAYBOOK.md`: 別ストア接続時の再セットアップ手順

### データテンプレート
- `PRODUCT_MASTER_TEMPLATE.csv`: 商品情報入力テンプレート

## 5. 更新ルール（推奨）
- 要件変更時: `PROJECT_FOUNDATION_JP.md` を先に更新
- 実装進捗が変化したら: `EXECUTION_STATUS.md` を更新
- 並列開発ルール変更時: `PARALLEL_DEVELOPMENT_SOP.md` と `PARALLEL_DEVELOPMENT_BASELINE.md` を同時更新
- エージェントへの依頼フォーマット変更時: `AGENT_PROMPT_TEMPLATES.md` を更新
