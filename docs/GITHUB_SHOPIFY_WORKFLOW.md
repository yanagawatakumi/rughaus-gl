# GitHub + Shopify 連携ワークフロー

最終更新日: 2026-04-13
対象: `rughaus-jp-horizon` テーマ

## 0. 事前前提（Codex + Shopify CLI）
- `shopify version` が `3.93.2` 以上であること（`shopify store` 利用のため）
- Codex 側で Shopify Dev MCP / Shopify skills が有効化済みであること
- 詳細手順は `CODEX_SHOPIFY_AI_TOOLKIT_RUNBOOK.md` を参照

## 1. ブランチ運用
- `main`: 本番テーマ用
- `develop`: 検証テーマ用
- `feature/*`: 開発作業用

## 2. 初回セットアップ（ローカル）
```bash
cd "/Users/yana/Desktop/RUGHAUS/サイトテーマ/rughaus-jp-horizon"
git remote add origin <GITHUB_REPO_URL>
git push -u origin main
git push -u origin develop
```

## 3. Shopify管理画面でGitHub連携
1. `Online Store > Themes > Add theme > Connect from GitHub`
2. リポジトリを選択
3. `develop` を接続して検証テーマを作成
4. （必要になったら）`main` を本番テーマへ接続

## 4. 日々の開発フロー
```bash
git checkout develop
git checkout -b feature/<task-name>
# 変更
git add .
git commit -m "feat: <summary>"
git push -u origin feature/<task-name>
```

- PR: `feature/* -> develop`
- 検証OK後: `develop -> main` をPR

## 5. ローカルプレビュー（任意）
```bash
shopify theme dev --store rughaus-gl.myshopify.com
```

## 6. ストア実行系（任意）
```bash
shopify store auth --store xfxfwd-8p.myshopify.com --scopes read_products,read_inventory,write_products,write_inventory
shopify store execute --store xfxfwd-8p.myshopify.com --query "query { shop { name primaryDomain { url } } }"
```

## 7. CLI権限エラー時の対処
- 先にブラウザでShopify Adminにログインしておく
- ストアの恒久ドメイン（`*.myshopify.com`）を使う
- アカウント権限を確認（テーマ編集可能）
- `OAuth callback store does not match the requested store` が出たら、エラーに表示された恒久ドメインで `shopify store auth` を再実行する
- `Port <number> is already in use` が出たら、`lsof` で占有プロセスを確認して停止する

## 8. 同期ズレ時
- Shopifyテーマカードの `Actions > Reset to last commit` を実行
