import React from 'react';
import EditableForm from './atoms/EditableForm';
import NewForm from './atoms/NewForm';

// 型定義
interface AssetItem {
  id: string;
  label: string;
  amount: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

interface AssetCategory {
  id: string;
  label: string;
  type: 'asset' | 'liability';
  order: number;
}

interface MonthlyAssets {
  month: string;
  items: AssetItem[];
}

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
const initialAssetsData: MonthlyAssets = {
  month: '2025-12',
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
      amount: 1000000,
      categoryId: 'insurance',
      createdAt: '2025-01-01T00:00:00Z',
      updatedAt: '2025-01-01T00:00:00Z',
    },

    // 投資
    {
      id: 'investment-001',
      label: '株式投資',
      amount: 2900000,
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
      amount: 700000,
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
};

// ユーティリティ関数
const calculateCategorySummary = (items: AssetItem[], categoryId: string): number => {
  return items.filter(item => item.categoryId === categoryId).reduce((sum, item) => sum + item.amount, 0);
};

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
  const [assetsData, setAssetsData] = React.useState<MonthlyAssets>(initialAssetsData);

  const totalAssets = calculateTotalAssets(assetsData.items);
  const totalLiabilities = calculateTotalLiabilities(assetsData.items);
  const netWorth = totalAssets - totalLiabilities;

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
    setAssetsData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === itemId) {
          const updatedItem = { ...item, updatedAt: new Date().toISOString() };

          if (field === 'label') {
            updatedItem.label = newValue;
          } else if (field === 'amount') {
            const amount = parseInt(newValue.replace(/[^\d]/g, ''), 10);
            if (!isNaN(amount)) {
              updatedItem.amount = amount;
            }
          }

          return updatedItem;
        }
        return item;
      }),
    }));
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

    setAssetsData(prev => ({
      ...prev,
      items: [...prev.items, newItem],
    }));
  };

  return (
    <div className="contents">
      <h2>資産</h2>
      <div className="content">
        <div className="content__title">資産推移</div>
        <div>純資産: {netWorth.toLocaleString()}円</div>
        <div>総資産: {totalAssets.toLocaleString()}円</div>
        <div>総負債: {totalLiabilities.toLocaleString()}円</div>
      </div>
      <div className="content">
        <div className="content__title">2025年12月</div>
        <div className="balance-sheet balance-sheet__net-worth">
          <div className="balance-sheet__header">
            <p>カテゴリ:金額</p>
            <p>純資産:{netWorth.toLocaleString()}円</p>
          </div>
        </div>
        <div className="balance-sheet balance-sheet__assets">
          <div className="balance-sheet__header assets__header">
            <p className="balance-sheet__header-description">カテゴリ:金額</p>
            <p className="balance-sheet__header-title">資産:{totalAssets.toLocaleString()}円</p>
          </div>
          <div className="balance-sheet__categories assets__categories">
            {CATEGORIES.filter(category => category.type === 'asset').map(category => {
              const summary = calculateCategorySummary(assetsData.items, category.id);
              const categoryItems = assetsData.items.filter(item => item.categoryId === category.id);

              return (
                <div key={category.id}>
                  <div className="balance-sheet__category">
                    {category.label}: {summary.toLocaleString()}円{' '}
                  </div>
                  {categoryItems.length > 0 && (
                    <>
                      {categoryItems.map((item, itemIndex) => (
                        <div className="balance-sheet__item assets__item" key={item.id}>
                          {/* アイテム名の編集 */}
                          <EditableForm
                            value={item.label}
                            onSave={(value: string) => handleItemUpdate(item.id, 'label', value)}
                            isAmount={false}
                            tabIndex={calculateTabIndex(category.id, itemIndex, 'label')}
                          />
                          {/* 金額の編集 */}
                          <EditableForm
                            value={item.amount.toLocaleString() + '円'}
                            onSave={(value: string) => handleItemUpdate(item.id, 'amount', value)}
                            isAmount={true}
                            tabIndex={calculateTabIndex(category.id, itemIndex, 'amount')}
                          />
                        </div>
                      ))}
                    </>
                  )}
                  <div className="balance-sheet__item assets__item">
                    {/* 新規アイテム追加用 */}
                    <NewForm placeholder="新規追加" onAdd={label => handleAddLabel(category.id, label)} isAmount={false} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="balance-sheet balance-sheet__liabilities">
          <div className="balance-sheet__header liabilities__header">
            <p>カテゴリ:金額</p>
            <p>負債:{totalLiabilities.toLocaleString()}円</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
