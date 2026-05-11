# Parallel Development Baseline (RUGHAUS)

最終更新日: 2026-05-11
対象リポジトリ: `rughaus-jp-horizon`

## 1. 目的
- 複数エージェントが同時に作業しても、差分混在・競合・merge事故を抑えて `develop` へ安全に反映する。
- Shopify同期コミット（`Update from Shopify ...`）が流入する前提で、取り込み経路を固定する。

## 運用ドキュメントの位置づけ
- 本書: 並列開発の「方針」と「ガードレール」。
- 実行手順: `docs/PARALLEL_DEVELOPMENT_SOP.md` を参照（Contributor/Integratorの標準作業手順）。

## 2. 役割
- Integrator
  - `develop` へのマージ順を最終判断する。
  - 高競合ファイル（`templates/index.json`, `config/settings_data.json`, `locales/*` 大量更新）の最終反映責任を持つ。
- Contributor (agent)
  - `codex/<task>-<agent>` ブランチで作業し、PRで反映する。
  - 同一worktree共有をしない。

## 3. ブランチ/Worktree運用（必須）
- `develop` へ直接pushしない（PR必須）。
- 各エージェントは専用worktreeで作業する。

### 作業開始テンプレート
```bash
git fetch origin

git worktree add ../rughaus-jp-horizon-<agent> \
  -b codex/<task>-<agent> origin/develop

cd ../rughaus-jp-horizon-<agent>
git status --short --branch
```

### 同期取り込みテンプレート（Shopify起因）
```bash
git fetch origin

git worktree add ../rughaus-jp-horizon-sync-<date> \
  -b sync/shopify-<YYYYMMDD> origin/develop
```

- `sync/* -> develop` も通常PRと同列にレビューする。
- `sync/*` 取り込み中は Integrator がマージ順を固定する。

## 4. 高競合ファイル運用
- `templates/index.json` と `config/settings_data.json`
  - 必要差分は各ブランチで作ってよいが、最終統合は Integrator 主導で実施する。
- `locales/*`
  - 大量翻訳更新は機能PRと分離し、`locales-only` PRとして提出する。

## 5. マージ前ゲート（最小）
- 必須コマンド:
```bash
shopify theme check --path . --fail-level error --output json
```
- PRテンプレートで結果貼付を必須化する（`.github/pull_request_template.md`）。
- GitHub Actions（`.github/workflows/theme-check.yml`）で同等のチェックを自動実行する。

## 6. GitHub設定（管理者作業）
`develop` ブランチ保護で次を有効化する。
1. Require a pull request before merging
2. Require approvals（最低1）
3. Require status checks to pass before merging（`Theme Check`）
4. Include administrators
5. Disallow force pushes / deletion

## 7. 受け入れテスト
1. 2エージェントが別worktree・別ブランチで同時作業し、`develop` まで反映できる。
2. 競合ファイルを含む2PRを投入し、Integratorの順序制御でマージできる。
3. `sync/*` PRと通常機能PRが同時に存在しても、順序制御で`develop`が壊れない。
4. `Theme Check` 失敗PRがマージされない。

## 8. 成功条件
- 未コミット差分の混在が常態化しない。
- `develop` 反映はPR履歴で追跡できる。
- 競合発生時の責任者（Integrator）と解消手順が固定される。
