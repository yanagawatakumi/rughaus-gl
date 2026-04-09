# 参考サイト分析: Nordic Knots（EU）

最終更新日: 2026-04-09
対象URL: https://nordicknots.com/eu
目的: 公開情報からIA/導線パターンを抽出し、RUGHAUS GLに転用可能な要素を整理する

## 1. 全体構造の所見
- グローバルナビは「カテゴリ中心 + サポート + プロ導線」で構成されている
- ヘッダー直下で国/通貨選択とカート導線を提供している
- Topは長いストーリー型LPで、カテゴリ別のセクション（Rugs/Curtains/Bedding）に分割される
- Collectionはフィルタ主導（Style/Color/Size系）で、商品探索の入口を多数用意している
- Custom Sizeは独立した導線を持ち、通常商品とは別体験として設計されている

## 2. 確認できた主要ページ群
- EUで確認できたページ:
  - Home: `/eu`
  - About: `/eu/about`
- EUで自動取得が不安定なため、同構造のUSで確認したページ:
  - Shop All Rugs: `/us/rugs`
  - Custom Size hub: `/us/custom-sized-rugs`
  - Custom Size product例: `/us/product/park-03-burgundy-custom-rug`
  - Support: `/us/support`
  - Pro/Trade訴求: `/us/pro-membership`

## 3. ヘッダー/メニュー設計の学べる点
- Primaryカテゴリを大きく分け、メガメニュー内でさらに「Category/Style/Color/Size」に分解
- SupportとTradeを常に見える導線として維持
- 商品カテゴリだけでなく「Inspiration」「Help」を同階層で持ち、探索と不安解消を同時に設計

## 4. Product体験の学べる点（Custom Rug）
- CustomサイズPDPで `Width / Length` の入力UIを明確に分離
- サイズガイド導線を同画面に常設
- `Add to cart` と `Rug sample` を並列提示してCVの分岐を作っている
- 相談導線（consultation / chat）をPDP上に設置し、高単価商品の不安を下げている

## 5. Support/Tradeページの学べる点
- Supportは「問い合わせチャネル + FAQカテゴリ」を1ページに集約
- Tradeはメリット訴求と申込導線（Apply）に特化したLP設計
- 両ページとも、CVボタンを上部に配置して離脱前に行動を促している

## 6. RUGHAUSに転用しやすい要素
- All rugs / Custom rugs / Stock rugs の3コレクション構成
- Custom rug商品だけサイズオーダーUIを表示
- Support & FAQを1ページで完結
- Tradeを申込LPとして公開し、誰でも閲覧可能
- ヘッダーに通貨選択とカートを常設

## 7. 追加提案（採用優先度）
- 優先度高: Custom rug PDPに「サイズガイド」「相談導線」を追加
- 優先度高: SupportページにFAQカテゴリのアンカー導線を実装
- 優先度中: All rugs内の探索性向上（Style/Color/Sizeベースの絞り込み導線）
- 優先度中: TradeページをLP化（メリット一覧 + 申込CTA）

## 8. 注意事項
- 参考化はIA/UXパターンに限定し、文言・画像・実装コードの流用は行わない
- 一部ページは自動取得時にエラーとなるため、必要に応じて手動確認を併用する

## 9. 参照ソース
- Home（EU）: https://nordicknots.com/eu
- About（EU）: https://nordicknots.com/eu/about
- Custom Sized Rugs（US同構造）: https://nordicknots.com/us/custom-sized-rugs
- Custom Rug PDP例（US同構造）: https://nordicknots.com/us/product/park-03-burgundy-custom-rug
- Shop All Rugs（US同構造）: https://nordicknots.com/us/rugs
- Support（US同構造）: https://nordicknots.com/us/support
- Pro Membership（US同構造）: https://nordicknots.com/us/pro-membership
