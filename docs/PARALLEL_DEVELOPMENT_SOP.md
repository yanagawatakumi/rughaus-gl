# Parallel Development SOP (AI Agents)

最終更新日: 2026-05-11  
対象リポジトリ: `rughaus-jp-horizon`

このドキュメントは、AIエージェントが並列開発を安全に実行するための標準手順（SOP）です。  
「迷ったらこの手順に戻る」を前提にしています。

## 1. 役割
- `Contributor`（各開発エージェント）
  - 機能実装を担当。
  - 専用ブランチ + 専用worktreeで作業。
  - `codex/* -> develop` のPRを作成。
- `Integrator`（統合担当）
  - マージ順の最終決定者。
  - 高競合ファイルの最終反映責任者。
  - `develop -> main` 昇格PRを管理。

## 2. 絶対ルール（Must）
1. `develop` / `main` へ直接pushしない（PR必須）。
2. 同一worktreeを複数エージェントで共有しない。
3. 開始時は必ず `origin/develop` から新規ブランチを作る。
4. マージ前に `Theme Check` を通す。
5. 高競合ファイルは Integrator レーンで最終統合する。

## 3. 命名規約
- 機能ブランチ: `codex/<task>-<agent>`
- Shopify同期ブランチ: `sync/shopify-YYYYMMDD`
- 作業ディレクトリ例: `../rughaus-jp-horizon-<agent>`

## 4. Contributor 手順（開始〜PR）

### 4.1 開始前チェック
```bash
git status --short --branch
git fetch origin
```

- 未コミット差分がある場合は、その場で作業しない。
- 別エージェント差分を上書きしない。

### 4.2 専用worktree作成
```bash
git worktree add ../rughaus-jp-horizon-<agent> \
  -b codex/<task>-<agent> origin/develop

cd ../rughaus-jp-horizon-<agent>
git status --short --branch
```

### 4.3 実装
- 実装対象外ファイルは触らない。
- 高競合ファイル（後述）を編集した場合はPR本文に明記する。

### 4.4 ローカル検証（必須）
```bash
shopify theme check --path . --fail-level error --output json
```

- `[]` もしくは `error 0件` を確認。

### 4.5 commit / push
```bash
git add .
git commit -m "feat: <summary>"
git push -u origin codex/<task>-<agent>
```

### 4.6 PR作成
- 方向: `codex/* -> develop`
- `.github/pull_request_template.md` を必ず埋める。
- PRに以下を記載:
  - Theme Check 結果
  - 競合注意ファイルの編集有無
  - マージ順依存（ある場合）

## 5. Integrator 手順（統合）
1. Open PRを収集し、依存関係と競合可能性を確認。
2. 高競合ファイルを含むPRはマージ順を固定する。
3. `Theme Check` 成功を確認して `develop` へマージ。
4. リリース単位で `develop -> main` PRを作成。
5. `main` のチェック成功後にマージ。

## 6. 高競合ファイル運用
- 対象:
  - `templates/index.json`
  - `config/settings_data.json`
  - `locales/*`（大量更新時）
- ルール:
  1. Contributor は必要差分を作ってよい。
  2. 最終的な取り込み順は Integrator が決める。
  3. `locales/*` 大量更新は可能な限り `locales-only` PRに分離。

## 7. Shopify同期コミットの扱い
1. Shopify起因更新は `sync/shopify-YYYYMMDD` で受ける。
2. `sync/* -> develop` でPR化する。
3. 機能PRと同じレビュー・同じゲートで統合する。
4. 同時進行時は Integrator が順序制御する。

## 8. 障害時の標準対応

### 8.1 `develop` が進んでコンフリクトした
```bash
git fetch origin
git rebase origin/develop
# 解消後
shopify theme check --path . --fail-level error --output json
git push --force-with-lease
```

### 8.2 誤って同じworktreeで複数作業してしまった
- それ以上編集しない。
- 変更を保全（stash/patch）して、正しい専用worktreeへ移して再開。

### 8.3 Theme Check が失敗した
- エラーを解消してからPR更新。
- 「後で直す」を禁止。

## 9. Definition of Done
1. PRが `develop` または `main` にマージ済み。
2. Required check（`Theme Check`）が成功。
3. 変更履歴がPRで追跡可能。
4. 高競合ファイルの統合判断が記録されている。

## 10. 関連ドキュメント
- `docs/PARALLEL_DEVELOPMENT_BASELINE.md`（方針）
- `docs/GITHUB_SHOPIFY_WORKFLOW.md`（GitHub/Shopify運用）
- `.github/pull_request_template.md`（PR記載項目）
