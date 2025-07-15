import React from 'react';
import EditableSpan from './atoms/EditableSpan';

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
  const [editingItem, setEditingItem] = React.useState<{
    id: string;
    field: 'label' | 'amount';
  } | null>(null);
  const [editValue, setEditValue] = React.useState<string>('');

  const totalAssets = calculateTotalAssets(assetsData.items);
  const totalLiabilities = calculateTotalLiabilities(assetsData.items);
  const netWorth = totalAssets - totalLiabilities;

  // 編集開始（対象項目の設定）
  const handleEditStart = (itemId: string, field: 'label' | 'amount', currentValue: string) => {
    setEditingItem({ id: itemId, field });
    setEditValue(currentValue);
  };

  // 編集値の変更
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditValue(e.target.value);
  };

  // 編集終了（保存）
  const handleEditEnd = () => {
    if (!editingItem) return;

    setAssetsData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id === editingItem.id) {
          const updatedItem = { ...item, updatedAt: new Date().toISOString() };

          if (editingItem.field === 'label') {
            updatedItem.label = editValue;
          } else if (editingItem.field === 'amount') {
            const amount = parseInt(editValue.replace(/[^\d]/g, ''), 10);
            if (!isNaN(amount)) {
              updatedItem.amount = amount;
            }
          }

          return updatedItem;
        }
        return item;
      }),
    }));

    setEditingItem(null);
    setEditValue('');
  };

  // 編集キャンセル
  const handleEditCancel = () => {
    setEditingItem(null);
    setEditValue('');
  };

  // Enterキーで保存、Escapeキーでキャンセル
  const handleEditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleEditEnd();
    } else if (e.key === 'Escape') {
      handleEditCancel();
    }
  };

  console.log(assetsData);

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
            <p>カテゴリ:金額</p>
            <p>資産:{totalAssets.toLocaleString()}円</p>
          </div>
          <div className="balance-sheet__categories assets__categories">
            {CATEGORIES.filter(category => category.type === 'asset').map(category => {
              const summary = calculateCategorySummary(assetsData.items, category.id);
              const categoryItems = assetsData.items.filter(item => item.categoryId === category.id);

              return (
                <div className="assets__category" key={category.id}>
                  <p>
                    {category.label}: {summary.toLocaleString()}円{' '}
                  </p>
                  {categoryItems.length > 0 && (
                    <div style={{ marginLeft: '2rem' }}>
                      {categoryItems.map(item => (
                        <div key={item.id}>
                          {/* アイテム名の編集 */}
                          <EditableSpan
                            value={item.label}
                            onEdit={value => handleEditStart(item.id, 'label', value)}
                            isEditing={editingItem?.id === item.id && editingItem.field === 'label'}
                            editValue={editValue}
                            onEditChange={handleEditChange}
                            onEditEnd={handleEditEnd}
                            onEditKeyDown={handleEditKeyDown}
                          />
                          :{/* 金額の編集 */}
                          <EditableSpan
                            value={item.amount.toLocaleString() + '円'}
                            onEdit={() => handleEditStart(item.id, 'amount', item.amount.toString())}
                            isEditing={editingItem?.id === item.id && editingItem.field === 'amount'}
                            editValue={editValue}
                            onEditChange={handleEditChange}
                            onEditEnd={handleEditEnd}
                            onEditKeyDown={handleEditKeyDown}
                          />
                        </div>
                      ))}
                      <div>
                        <button>新規項目を追加</button>
                      </div>
                    </div>
                  )}
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
