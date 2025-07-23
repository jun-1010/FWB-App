import React from 'react';
import NetWorthSection from '../molecules/NetWorthSection';
import BalanceSheetSection from '../molecules/BalanceSheetSection';
import type { AssetItem, AssetCategory } from '../../types/assets';

interface BalanceSheetProps {
  assetsData: {
    month: string;
    items: AssetItem[];
  };
  categories: AssetCategory[];
  onItemUpdate: (itemId: string, field: 'label' | 'amount', newValue: string) => void;
  onAddLabel: (categoryId: string, label: string) => void;
  calculateTabIndex: (categoryId: string, itemIndex: number, field: 'label' | 'amount') => number;
  calculateTotalAssets: (items: AssetItem[]) => number;
  calculateTotalLiabilities: (items: AssetItem[]) => number;
}

// ユーティリティ関数
const calculateCategorySummary = (items: AssetItem[], categoryId: string): number => {
  return items.filter(item => item.categoryId === categoryId).reduce((sum, item) => sum + item.amount, 0);
};

const BalanceSheet: React.FC<BalanceSheetProps> = ({
  assetsData,
  categories,
  onItemUpdate,
  onAddLabel,
  calculateTabIndex,
  calculateTotalAssets,
  calculateTotalLiabilities,
}) => {
  const totalAssets = calculateTotalAssets(assetsData.items);
  const totalLiabilities = calculateTotalLiabilities(assetsData.items);
  const netWorth = totalAssets - totalLiabilities;

  return (
    <div className="content">
      <div className="content__title">{assetsData.month}</div>
      <NetWorthSection netWorth={netWorth} totalAssets={totalAssets} />

      <BalanceSheetSection
        title="資産"
        type="assets"
        totalAmount={totalAssets}
        categories={categories.filter(category => category.type === 'asset')}
        items={assetsData.items}
        onItemUpdate={onItemUpdate}
        onAddLabel={onAddLabel}
        calculateTabIndex={calculateTabIndex}
        calculateCategorySummary={calculateCategorySummary}
      />

      <BalanceSheetSection
        title="負債"
        type="liabilities"
        totalAmount={totalLiabilities}
        categories={categories.filter(category => category.type === 'liability')}
        items={assetsData.items}
        onItemUpdate={onItemUpdate}
        onAddLabel={onAddLabel}
        calculateTabIndex={calculateTabIndex}
        calculateCategorySummary={calculateCategorySummary}
      />
    </div>
  );
};

export default BalanceSheet;
