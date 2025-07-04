# Firestore設計仕様

## 概要

ユーザーを最上位とした階層構造で、表示速度を最適化するため非正規化を採用した設計。

## コレクション構造

```
users/                    # ユーザー情報
├── {userId}/
    ├── profile          # ユーザープロフィール
    ├── portfolio/          # 資産データ
    │   ├── {monthKey}   # 月別資産
    │   └── summary      # 資産サマリー（非正規化）
    ├── cashflow/   # 収支データ
    │   ├── {monthKey}   # 月別収支
    │   └── summary      # 収支サマリー（非正規化）
    └── lifePlan/        # ライフプランデータ
        ├── events       # ライフイベント
        └── projections  # 将来予測
```

## データ構造詳細

### ユーザープロフィール

```typescript
// users/{userId}/profile
{
  name: string,
  email: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### 資産データ（月別）

```typescript
// users/{userId}/portfolio/{monthKey}
{
  // 資産
  cash: number,                    // 現金
  savings: number,                 // 預金
  investments: {                   // 投資
    stocks: number,
    bonds: number,
    mutualFunds: number
  },
  realEstate: number,              // 不動産
  other: number,             // その他資産

  // 負債
  mortgage: number,                // 住宅ローン
  carLoan: number,                 // 自動車ローン
  creditCard: number,              // クレジットカード
  otherLiabilities: number,        // その他負債

  // メタデータ
  month: string,                   // YYYY-MM
  updatedAt: timestamp,
  netWorth: number                 // 純資産（非正規化）
}
```

### 資産サマリー（非正規化）

```typescript
// users/{userId}/portfolio/summary
{
  totalAssets: number,             // 総資産
  totalLiabilities: number,        // 総負債
  netWorth: number,                // 純資産
  lastUpdated: timestamp,
  monthlyTrend: {                  // 月次推移（最新12ヶ月）
    "2024-01": { netWorth: number, assets: number, liabilities: number },
    "2024-02": { netWorth: number, assets: number, liabilities: number },
    // ...
  }
}
```

### 収支データ（月別）

```typescript
// users/{userId}/cashflow/{monthKey}
{
  // 収入
  income: {
    salary: number,                // 給与
    bonus: number,                 // ボーナス
    investment: number,            // 投資収益
    other: number                  // その他収入
  },

  // 支出
  expenses: {
    housing: number,               // 住宅費
    food: number,                  // 食費
    transportation: number,        // 交通費
    utilities: number,             // 光熱費
    entertainment: number,         // 娯楽費
    medical: number,               // 医療費
    education: number,             // 教育費
    other: number                  // その他支出
  },

  // メタデータ
  month: string,                   // YYYY-MM
  updatedAt: timestamp,
  netIncome: number,               // 純収入（非正規化）
  savingsRate: number              // 貯蓄率（非正規化）
}
```

### 収支サマリー（非正規化）

```typescript
// users/{userId}/cashflow/summary
{
  averageMonthlyIncome: number,    // 月平均収入
  averageMonthlyExpense: number,   // 月平均支出
  averageSavingsRate: number,      // 平均貯蓄率
  lastUpdated: timestamp,
  monthlyTrend: {                  // 月次推移（最新12ヶ月）
    "2024-01": { income: number, expense: number, savings: number },
    "2024-02": { income: number, expense: number, savings: number },
    // ...
  }
}
```

### ライフプランデータ

```typescript
// users/{userId}/lifePlan/events
{
  events: [
    {
      id: string,
      title: string,               // イベント名
      date: timestamp,             // 予定日
      type: string,                // 結婚、出産、住宅購入など
      estimatedCost: number,       // 推定費用
      description: string
    }
  ],
  familyMembers: [
    {
      id: string,
      name: string,
      birthYear: number,
      relationship: string
    }
  ]
}

// users/{userId}/lifePlan/projections
{
  projections: {
    "2025": {
      expectedIncome: number,
      expectedExpense: number,
      expectedNetWorth: number,
      majorEvents: string[]
    },
    "2026": {
      // ...
    }
  }
}
```

## 非正規化の利点

1. **ダッシュボード表示の高速化**: サマリーデータを事前計算
2. **グラフ描画の最適化**: 月次推移データを即座に取得可能
3. **集計処理の軽減**: リアルタイム計算不要

## 更新時の処理例

```typescript
// 資産データ更新時の例
const updateAssets = async (
  userId: string,
  monthKey: string,
  assetData: any
) => {
  const batch = writeBatch(db);

  // 1. 月別データ更新
  const monthRef = doc(db, 'users', userId, 'assets', monthKey);
  batch.set(monthRef, { ...assetData, updatedAt: serverTimestamp() });

  // 2. サマリー更新（非正規化）
  const summaryRef = doc(db, 'users', userId, 'assets', 'summary');
  // 最新12ヶ月のデータを集計してサマリーを更新
  batch.set(summaryRef, updatedSummary, { merge: true });

  await batch.commit();
};
```

## セキュリティルールの考慮事項

- ユーザーは自分のデータのみアクセス可能
- 読み取り・書き込み権限の適切な設定
- バッチ処理時の整合性確保

## 今後の拡張予定

- リアルタイムリスナーの実装
- オフライン対応
- データエクスポート機能
- バックアップ・復元機能
