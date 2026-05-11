# Codex + Shopify AI Toolkit 運用ランブック

最終更新日: 2026-04-13  
対象: `rughaus-jp-horizon` 開発環境

## 1. 目的
- Codex から Shopify 公式ドキュメント検索、APIスキーマ参照、コード検証、ストア実行を再現可能な手順で運用する
- テーマ開発の精度向上と、将来の Storefront AI 活用に向けた基盤を維持する

## 2. 現在の有効化状態（2026-04-13）
- `DONE` Shopify Dev MCP を Codex に接続済み
  - `~/.codex/config.toml` に `mcp_servers.shopify-dev-mcp` を設定
- `DONE` Shopify AI Toolkit skills を導入済み（16 skill）
- `DONE` Shopify CLI を `3.93.2` に更新済み（`shopify store auth/execute` 利用可）
- `DONE` ストア実行認証と疎通確認済み
  - 認証ストア: `xfxfwd-8p.myshopify.com`
  - ストア表示ドメイン: `rughaus-gl.myshopify.com`

## 3. ドメイン運用ルール（重要）
- ブラウザ表示・テーマ確認: `rughaus-gl.myshopify.com`
- `shopify store auth` / `shopify store execute`: `xfxfwd-8p.myshopify.com` を使用

理由:
- OAuth callback 時に恒久ドメイン判定が入るため、`shopify store` 系コマンドは恒久ドメインで統一する

## 4. 日次運用コマンド
### 4-1. 認証（必要時のみ）
```bash
shopify store auth --store xfxfwd-8p.myshopify.com --scopes read_products,read_inventory,write_products,write_inventory
```

### 4-2. ストア疎通確認
```bash
shopify store execute --store xfxfwd-8p.myshopify.com --query "query { shop { name primaryDomain { url } } }"
```

### 4-3. テーマ静的検証
```bash
shopify theme check --path . --fail-level error --output json
```

### 4-4. テーマプレビュー
```bash
shopify theme dev --store rughaus-gl.myshopify.com
```

## 5. 既知の詰まりどころ
### Port in use
症状:
- `Port <number> is already in use`

対処:
```bash
lsof -nP -iTCP:<port> -sTCP:LISTEN
kill <PID>
```

### OAuth callback store mismatch
症状:
- `OAuth callback store does not match the requested store`

対処:
- エラーメッセージに表示される恒久ドメイン（今回: `xfxfwd-8p.myshopify.com`）で再実行する

## 6. 変更時のバックアップ方針
- `~/.codex/config.toml` を更新する前に必ずバックアップを作成する
```bash
cp ~/.codex/config.toml ~/.codex/config.toml.bak-$(date +%Y%m%d-%H%M%S)
```

## 7. 今後の拡張候補
- `TODO` Storefront MCP 導入（AI接客/Storefront AI agent 方向の拡張）
- `TODO` 運用ルール化: 変更時に本ランブックと `EXECUTION_STATUS.md` を同時更新
