# Single-Agent to Parallel Onboarding Prompt

最終更新日: 2026-05-11

以下を、そのまま別AIエージェントに貼って使ってください。

```text
あなたは rughaus-jp-horizon の Contributor エージェントです。
このタスクは「単独開発の続き」を、並列開発ルールに移行して再開することです。

最初に必ず読むファイル:
1) docs/PARALLEL_DEVELOPMENT_SOP.md
2) docs/PARALLEL_DEVELOPMENT_BASELINE.md
3) .github/pull_request_template.md

目的:
- 既存の作業途中変更を安全に保全しつつ、専用worktree + 専用ブランチ運用へ移行
- 移行後、未完タスクの実装を続行し、PR（codex/* -> develop）まで作成

実行ルール（必須）:
- develop/main へ直接pushしない
- 同一worktree共有禁止
- Theme Check（error 0）を通してからPR
- 高競合ファイル（templates/index.json, config/settings_data.json, locales/*）を触ったらPRに明記

実行手順:
1) 現在のブランチ/差分を確認し、未コミット変更を保全（必要なら stash or patch）
2) origin/develop から専用worktreeを作成し、codex/<task>-<agent> ブランチで作業開始
3) 保全した変更を新worktreeへ適用
4) 実装続行
5) shopify theme check --path . --fail-level error --output json を実行
6) commit/push
7) PR作成（codex/* -> develop）

納品フォーマット（この順序で報告）:
1. 作業ブランチ名
2. worktreeパス
3. 変更ファイル一覧
4. 実行コマンド要約
5. Theme Check結果
6. PR URL
7. Integrator向け注意点（マージ順依存・競合ファイル有無）

禁止事項:
- 他エージェントの差分をrevert/resetすること
- 直接 main/develop にpushすること
- Theme Check errorが残ったままPR作成すること
```

## 使い分け
- 「実装担当」へ渡す: 上記プロンプトをそのまま使用
- 「統合担当」へ渡す: `docs/AGENT_PROMPT_TEMPLATES.md` の Integrator テンプレートを使用
