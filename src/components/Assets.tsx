import React, { useEffect, useState } from 'react';
import BalanceSheet from './organisms/BalanceSheet';
import BarChart from './molecules/BarChart';
import type { AssetItem, AssetCategory, MonthlyAssets } from '../types/assets';

// カテゴリの定義
const CATEGORIES: AssetCategory[] = [
  // 資産カテゴリ
  { id: 'cash', label: '現預金', type: 'asset', order: 1 },
  { id: 'insurance', label: '保険', type: 'asset', order: 2 },
  { id: 'investment', label: '投資', type: 'asset', order: 3 },
  {
    id: 'realEstate',
    label: '不動産',
    type: 'asset',
    order: 4,
  },
  {
    id: 'otherAssets',
    label: 'その他',
    type: 'asset',
    order: 5,
  },

  // 負債カテゴリ
  { id: 'housing', label: '住宅', type: 'liability', order: 1 },
  { id: 'car', label: '車', type: 'liability', order: 2 },
  {
    id: 'education',
    label: '教育',
    type: 'liability',
    order: 3,
  },
  {
    id: 'otherLiabilities',
    label: 'その他',
    type: 'liability',
    order: 4,
  },
];

// 初期データ
const initialAssetsData: MonthlyAssets[] = [
  {
    month: '2025年1月',
    items: [
      // 現預金の詳細
      {
        id: 'cash-001',
        label: '財布',
        amount: 9000,
        categoryId: 'cash',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'cash-002',
        label: 'PayPay',
        amount: 80000,
        categoryId: 'cash',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'cash-003',
        label: '住信SBIネット銀行',
        amount: 300000,
        categoryId: 'cash',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },

      // 保険
      {
        id: 'insurance-001',
        label: '生命保険',
        amount: 100000,
        categoryId: 'insurance',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },

      // 投資
      {
        id: 'investment-001',
        label: '株式投資',
        amount: 100000,
        categoryId: 'investment',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },

      // その他資産
      {
        id: 'other-asset-001',
        label: 'その他資産',
        amount: 110000,
        categoryId: 'otherAssets',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },

      // 負債
      {
        id: 'housing-001',
        label: '住宅ローン',
        amount: 1500000,
        categoryId: 'housing',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'car-001',
        label: '車ローン',
        amount: 350000,
        categoryId: 'car',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
    ],
  },
  {
    month: '2025年2月',
    items: [
      // 現預金の詳細
      {
        id: 'cash-001',
        label: '財布',
        amount: 10000,
        categoryId: 'cash',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'cash-002',
        label: 'PayPay',
        amount: 90000,
        categoryId: 'cash',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'cash-003',
        label: '住信SBIネット銀行',
        amount: 400000,
        categoryId: 'cash',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },

      // 保険
      {
        id: 'insurance-001',
        label: '生命保険',
        amount: 500000,
        categoryId: 'insurance',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },

      // 投資
      {
        id: 'investment-001',
        label: '株式投資',
        amount: 200000,
        categoryId: 'investment',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },

      // その他資産
      {
        id: 'other-asset-001',
        label: 'その他資産',
        amount: 100000,
        categoryId: 'otherAssets',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },

      // 負債
      {
        id: 'housing-001',
        label: '住宅ローン',
        amount: 1000000,
        categoryId: 'housing',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'car-001',
        label: '車ローン',
        amount: 300000,
        categoryId: 'car',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
    ],
  },
  {
    month: '2025年3月',
    items: [
      // 現預金の詳細
      {
        id: 'cash-001',
        label: '財布',
        amount: 10000,
        categoryId: 'cash',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'cash-002',
        label: 'PayPay',
        amount: 90000,
        categoryId: 'cash',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'cash-003',
        label: '住信SBIネット銀行',
        amount: 400000,
        categoryId: 'cash',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },

      // 保険
      {
        id: 'insurance-001',
        label: '生命保険',
        amount: 500000,
        categoryId: 'insurance',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },

      // 投資
      {
        id: 'investment-001',
        label: '株式投資',
        amount: 1000000,
        categoryId: 'investment',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },

      // その他資産
      {
        id: 'other-asset-001',
        label: 'その他資産',
        amount: 100000,
        categoryId: 'otherAssets',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },

      // 負債
      {
        id: 'housing-001',
        label: '住宅ローン',
        amount: 500000,
        categoryId: 'housing',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
      {
        id: 'car-001',
        label: '車ローン',
        amount: 300000,
        categoryId: 'car',
        createdAt: '2025-01-01T00:00:00Z',
        updatedAt: '2025-01-01T00:00:00Z',
      },
    ],
  },
];

// ユーティリティ関数
const calculateTotalAssets = (items: AssetItem[]): number => {
  return items
    .filter(item => {
      const category = CATEGORIES.find(cat => cat.id === item.categoryId);
      return category?.type === 'asset';
    })
    .reduce((sum, item) => sum + item.amount, 0);
};

const calculateTotalLiabilities = (items: AssetItem[]): number => {
  return items
    .filter(item => {
      const category = CATEGORIES.find(cat => cat.id === item.categoryId);
      return category?.type === 'liability';
    })
    .reduce((sum, item) => sum + item.amount, 0);
};

const Assets: React.FC = () => {
  const [selectMonthIndex, setSelectMonthIndex] = useState<number>(0);
  const [monthlyAssetsData, setMonthlyAssetsData] = useState<MonthlyAssets[]>(initialAssetsData);
  const [assetsData, setAssetsData] = useState<MonthlyAssets>(monthlyAssetsData[selectMonthIndex]);

  useEffect(() => setAssetsData(monthlyAssetsData[selectMonthIndex]), [selectMonthIndex, monthlyAssetsData]);

  // tabIndexを計算する関数
  //
  // カテゴリ全体で連続したtabIndexを生成する
  // 例: cash(3アイテム) → insurance(1アイテム) → investment(1アイテム) の場合
  // cash: tabIndex 1,2,3,4,5,6 (3アイテム × 2フィールド)
  // insurance: tabIndex 7,8 (1アイテム × 2フィールド)
  // investment: tabIndex 9,10 (1アイテム × 2フィールド)
  //
  // 引数例:
  // calculateTabIndex('cash', 0, 'label') → 1 (cashの1番目のアイテムのラベル)
  // calculateTabIndex('cash', 0, 'amount') → 2 (cashの1番目のアイテムの金額)
  // calculateTabIndex('cash', 1, 'label') → 3 (cashの2番目のアイテムのラベル)
  // calculateTabIndex('insurance', 0, 'label') → 7 (insuranceの1番目のアイテムのラベル)
  const calculateTabIndex = (categoryId: string, itemIndex: number, field: 'label' | 'amount'): number => {
    const assetCategories = CATEGORIES.filter(category => category.type === 'asset');
    const currentCategoryIndex = assetCategories.findIndex(cat => cat.id === categoryId);

    if (currentCategoryIndex === -1) return 0;

    // 現在のカテゴリより前のカテゴリのアイテム数を合計
    // 例: insuranceの場合、cashの3アイテム分を合計
    let previousItemsCount = 0;
    for (let i = 0; i < currentCategoryIndex; i++) {
      const category = assetCategories[i];
      const categoryItems = assetsData.items.filter(item => item.categoryId === category.id);
      previousItemsCount += categoryItems.length;
    }

    // ベースインデックスを計算
    // 例: insuranceの場合、3(previousItemsCount) * 2 + 0(itemIndex) * 2 = 6
    const baseIndex = previousItemsCount * 2 + itemIndex * 2;

    // フィールドに応じて+1（label）または+2（amount）
    // 例: insuranceの場合、baseIndex=6なので
    // label: 6 + 1 = 7, amount: 6 + 2 = 8
    return field === 'label' ? baseIndex + 1 : baseIndex + 2;
  };

  // アイテムの更新
  const handleItemUpdate = (itemId: string, field: 'label' | 'amount', newValue: string) => {
    if (field === 'label') {
      // ラベルの更新は全月の同じIDのアイテムを更新
      setMonthlyAssetsData(prev =>
        prev.map(monthData => ({
          ...monthData,
          items: monthData.items.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                label: newValue,
                updatedAt: new Date().toISOString(),
              };
            }
            return item;
          }),
        }))
      );
    } else if (field === 'amount') {
      // 金額の更新は現在の月のみ
      const amount = parseInt(newValue.replace(/[^\d]/g, ''), 10);
      if (!isNaN(amount)) {
        setMonthlyAssetsData(prev =>
          prev.map((monthData, index) => {
            if (index === selectMonthIndex) {
              return {
                ...monthData,
                items: monthData.items.map(item => {
                  if (item.id === itemId) {
                    return {
                      ...item,
                      amount: amount,
                      updatedAt: new Date().toISOString(),
                    };
                  }
                  return item;
                }),
              };
            }
            return monthData;
          })
        );
      }
    }
  };

  // 新規アイテムの追加（ラベル）
  const handleAddLabel = (categoryId: string, label: string) => {
    const newItem: AssetItem = {
      id: `${categoryId}-${Date.now()}`,
      label,
      amount: 0, // 初期値は0
      categoryId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // 新規アイテムを全月に追加
    setMonthlyAssetsData(prev =>
      prev.map(monthData => ({
        ...monthData,
        items: [...monthData.items, newItem],
      }))
    );
  };

  // 新しい月の追加
  const handleAddMonth = (month: number) => {
    const year = 2025; // 現在の年を固定
    const monthLabel = `${year}年${month}月`;

    // 既存の月データからアイテムの構造をコピー（金額は0で初期化）
    const existingItems = monthlyAssetsData.length > 0 ? monthlyAssetsData[0].items : [];
    const newItems = existingItems.map(item => ({
      ...item,
      amount: 0, // 金額を0で初期化
      updatedAt: new Date().toISOString(),
    }));

    const newMonthData: MonthlyAssets = {
      month: monthLabel,
      items: newItems,
    };

    // 新しい月データを追加
    setMonthlyAssetsData(prev => {
      const newData = [...prev, newMonthData];
      // 月順にソート
      return newData.sort((a, b) => {
        const aMatch = a.month.match(/^(\d{4})年(\d{1,2})月$/);
        const bMatch = b.month.match(/^(\d{4})年(\d{1,2})月$/);
        if (aMatch && bMatch) {
          const aMonth = parseInt(aMatch[2], 10);
          const bMonth = parseInt(bMatch[2], 10);
          return aMonth - bMonth;
        }
        return 0;
      });
    });

    // 新しい月を選択
    setSelectMonthIndex(monthlyAssetsData.length);
  };

  return (
    <div className="contents">
      <h2>資産</h2>
      <BarChart
        monthlyAssetsData={monthlyAssetsData}
        selectMonthIndex={selectMonthIndex}
        onMonthSelect={setSelectMonthIndex}
        onAddMonth={handleAddMonth}
        calculateTotalAssets={calculateTotalAssets}
        calculateTotalLiabilities={calculateTotalLiabilities}
      />
      <BalanceSheet
        assetsData={assetsData}
        categories={CATEGORIES}
        onItemUpdate={handleItemUpdate}
        onAddLabel={handleAddLabel}
        calculateTabIndex={calculateTabIndex}
        calculateTotalAssets={calculateTotalAssets}
        calculateTotalLiabilities={calculateTotalLiabilities}
      />
    </div>
  );
};

export default Assets;
