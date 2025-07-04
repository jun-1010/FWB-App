# Moneta要件定義

## 概要

家計管理とライフプランをオールインワンで行い、ファイナンシャルウェルビーイングを向上させる Web アプリケーション

## ドキュメント構成

### 要件定義

- [プロジェクト概要](./requirements/overview.md)
- [機能要件](./requirements/functional.md)
- [非機能要件](./requirements/non-functional.md)
- [技術要件](./requirements/technical.md)
- [画面構成](./requirements/ui-design.md)

### 開発計画

- [開発フェーズ](./development/phases.md)
- [アーキテクチャ設計](./development/architecture.md)
- [デプロイ計画](./development/deployment.md)

### データ設計

- [データモデル](./data/data-model.md)
- [セキュリティ要件](./data/security.md)

## 開発フェーズ概要

1. **Phase 1**: 極シンプル版（MVP） - DB とデプロイまで完了
2. **Phase 2**: 認証機能実装 - 認証基盤を確立
3. **Phase 3**: 資産管理 - 認証機能付き資産管理システム
4. **Phase 4**: 支出管理 - 支出管理機能を追加
5. **Phase 5**: 予算管理 - 予算管理機能を追加
6. **Phase 6**: 統合・最適化 - 全機能の統合と最適化

## 技術スタック

- **フロントエンド**: React 18+, TypeScript, Vite
- **データベース**: Firebase Firestore
- **認証**: Firebase Authentication
- **デプロイ**: Vercel
- **開発環境**: ESLint, Prettier

## 次のステップ

1. 詳細な UI/UX デザインの作成
2. 技術スタックの最終決定
3. プロジェクトの初期化
4. 開発環境のセットアップ
5. 基本機能の実装開始
