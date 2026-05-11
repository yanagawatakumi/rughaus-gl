# Agent Prompt Templates (Parallel Development)

最終更新日: 2026-05-11

このファイルは、別AIエージェントへ依頼する際のコピペ用テンプレートです。

## 1. Contributor 依頼テンプレート

```text
あなたは Contributor エージェントです。対象リポジトリは rughaus-jp-horizon。

必ず docs/PARALLEL_DEVELOPMENT_SOP.md を最初に読んでください。

今回の担当タスク:
- <ここにタスク内容>

制約:
- develop/main へ直接pushしない（PR必須）
- 専用worktree + codex/<task>-<agent> ブランチで作業
- Theme Check を通してからPR
- 高競合ファイル（templates/index.json, config/settings_data.json, locales/*）を編集した場合はPR本文に明記

納品物:
1) 変更ファイル一覧
2) 実行コマンド要約
3) Theme Check 結果
4) PR URL（codex/* -> develop）
5) Integrator向け注意点（マージ順依存がある場合）
```

## 2. Integrator 依頼テンプレート

```text
あなたは Integrator エージェントです。対象リポジトリは rughaus-jp-horizon。

必ず docs/PARALLEL_DEVELOPMENT_SOP.md を最初に読んでください。

今回の担当:
- Open PRを整理し、競合を回避しながら develop に統合
- 必要に応じて develop -> main の昇格PRを実施

必須チェック:
1) Theme Check 成功
2) 高競合ファイルの競合有無
3) マージ順依存の確認
4) 同期PR（sync/*）と機能PRの順序整理

納品物:
1) マージ順の判断理由
2) マージしたPR一覧
3) 見送りPRと理由
4) develop/main の最終状態
```

## 3. Shopify 同期取り込み依頼テンプレート

```text
あなたは同期取り込み担当エージェントです。対象リポジトリは rughaus-jp-horizon。

docs/PARALLEL_DEVELOPMENT_SOP.md に従い、Shopify起因更新を取り込んでください。

要件:
- sync/shopify-YYYYMMDD ブランチを作成
- 差分を確認し、sync/* -> develop のPRを作成
- Theme Check を通す
- 機能PRとのコンフリクト可能性を記載

納品物:
1) 同期差分サマリ
2) Theme Check 結果
3) PR URL
4) Integrator向け衝突ポイント
```

## 4. 依頼者（あなた）向け注意
- 1プロンプト = 1責務に分ける（実装担当 / 統合担当を混ぜない）。
- 作業開始前に必ず「どのブランチとworktreeで作業するか」を宣言させる。
- 納品物フォーマットを固定し、比較しやすくする。
