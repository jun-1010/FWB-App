import React from 'react';
import EditableForm from '../atoms/EditableForm';
import NewForm from '../atoms/NewForm';
import type { AssetItem, AssetCategory } from '../../types/assets';

interface BalanceSheetSectionProps {
  title: string;
  type: 'assets' | 'liabilities';
  totalAmount: number;
  categories: AssetCategory[];
  items: AssetItem[];
  onItemUpdate: (itemId: string, field: 'label' | 'amount', newValue: string) => void;
  onAddLabel: (categoryId: string, label: string) => void;
  calculateTabIndex: (categoryId: string, itemIndex: number, field: 'label' | 'amount') => number;
  calculateCategorySummary: (items: AssetItem[], categoryId: string) => number;
}

const BalanceSheetSection: React.FC<BalanceSheetSectionProps> = ({
  title,
  type,
  totalAmount,
  categories,
  items,
  onItemUpdate,
  onAddLabel,
  calculateTabIndex,
  calculateCategorySummary,
}) => {
  return (
    <div className={`balance-sheet`}>
      <div className={`balance-sheet__header ${type}__header`}>
        <div className="balance-sheet__row">
          <span className="balance-sheet__cell balance-sheet__header-description">カテゴリ</span>
          <span className="balance-sheet__cell balance-sheet__cell--amount balance-sheet__header-description">金額</span>
          <span className="balance-sheet__cell balance-sheet__cell--percent balance-sheet__header-description">割合</span>
        </div>
        <div className="balance-sheet__row">
          <span className="balance-sheet__cell">{title}</span>
          <span className="balance-sheet__cell balance-sheet__cell--amount">{totalAmount.toLocaleString()}円</span>
          <span className="balance-sheet__cell balance-sheet__cell--percent">{totalAmount === 0 ? '0.0%' : '100.0%'}</span>
        </div>
      </div>
      <div className={`balance-sheet__categories ${type}__categories`}>
        {categories.map(category => {
          const summary = calculateCategorySummary(items, category.id);
          const categoryItems = items.filter(item => item.categoryId === category.id);

          return (
            <div key={category.id}>
              <div className="balance-sheet__row">
                <span className="balance-sheet__cell">{category.label}</span>
                <span className="balance-sheet__cell balance-sheet__cell--amount">{summary.toLocaleString()}円</span>
                <span className="balance-sheet__cell balance-sheet__cell--percent">
                  {totalAmount === 0 ? '0.0%' : ((summary / totalAmount) * 100).toFixed(1) + '%'}
                </span>
              </div>
              {categoryItems.length > 0 && (
                <>
                  {categoryItems.map((item, itemIndex) => (
                    <div className={`balance-sheet__row ${type}__item`} key={item.id}>
                      {/* アイテム名の編集 */}
                      <EditableForm
                        value={item.label}
                        onSave={(value: string) => onItemUpdate(item.id, 'label', value)}
                        isAmount={false}
                        tabIndex={calculateTabIndex(category.id, itemIndex, 'label')}
                      />
                      {/* 金額の編集 */}
                      <EditableForm
                        value={item.amount.toLocaleString() + '円'}
                        onSave={(value: string) => onItemUpdate(item.id, 'amount', value)}
                        isAmount={true}
                        tabIndex={calculateTabIndex(category.id, itemIndex, 'amount')}
                      />

                      <span className="balance-sheet__cell balance-sheet__cell--percent">
                        {totalAmount === 0 ? '0.0%' : ((item.amount / totalAmount) * 100).toFixed(1) + '%'}
                      </span>
                    </div>
                  ))}
                </>
              )}
              <div className={`balance-sheet__row ${type}__item`}>
                {/* 新規アイテム追加用 */}
                <NewForm placeholder="新規追加" onAdd={label => onAddLabel(category.id, label)} isAmount={false} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BalanceSheetSection;
