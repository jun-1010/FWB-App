# 技術要件

## フロントエンド

- React 18+
- TypeScript
- CSS Modules / Styled Components
- React Router
- Chart.js / Recharts（グラフ表示）

## 状態管理

- React Context API
- または Redux Toolkit

## データ保存

### 選定技術: Firebase Firestore

- **選定理由**: データ同期・アカウント機能、実装容易性、価格の 3 観点で最適
- **比較対象**: LocalStorage、IndexedDB、SQLite、Supabase、AWS DynamoDB

#### 選定基準

- **データ同期・アカウント機能**: リアルタイム同期 + 認証機能完備
- **実装容易性**: 比較的簡単（ドキュメント充実）
- **価格**: 無料枠あり（1GB/月まで）

#### 技術詳細

- リアルタイム同期機能
  iPhone と Mac 間でデータを同期し、マルチデバイス利用を実現する。
- 認証・セキュリティ統合
  サービス利用者としての識別は行うが、現実世界の個人を特定する情報は一切保持しない。

## 開発環境

- **Vite**: 高速な開発サーバーとビルドツールで開発効率を大幅向上させる
- **ESLint**: TypeScript/React の構文エラー検出とコーディング規約を強制する
- **Prettier**: コードフォーマットを自動化して可読性と一貫性を保つ
