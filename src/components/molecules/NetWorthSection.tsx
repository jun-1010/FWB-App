import React from 'react';

interface NetWorthSectionProps {
  netWorth: number;
  totalAssets: number;
}

const NetWorthSection: React.FC<NetWorthSectionProps> = ({ netWorth, totalAssets }) => {
  // A:総資産と総負債が0の場合→純資産比率=0
  // B:総資産と総負債が0以外で相殺している場合→純資産比率=0%
  // C:総資産が0で総負債が0でない場合→純資産比率=-100%
  const netAssetRatio = totalAssets === 0 ? (netWorth === 0 ? 0 : -100) : (netWorth / totalAssets) * 100;
  return (
    <div className="balance-sheet balance-sheet__net-worth">
      <div className="balance-sheet__header">
        <div className="balance-sheet__row">
          <span className="balance-sheet__cell balance-sheet__header-description">カテゴリ</span>
          <span className="balance-sheet__cell balance-sheet__cell--amount balance-sheet__header-description">金額</span>
          <span className="balance-sheet__cell balance-sheet__cell--percent balance-sheet__header-description">純資産比率</span>
        </div>
        <div className="balance-sheet__row">
          <span className="balance-sheet__cell">純資産</span>
          <span
            className={
              netWorth > 0
                ? `balance-sheet__cell balance-sheet__cell--amount color--positive`
                : `balance-sheet__cell balance-sheet__cell--amount color--negative`
            }
          >
            {netWorth.toLocaleString()}円
          </span>
          <span
            className={
              netWorth > 0
                ? `balance-sheet__cell balance-sheet__cell--percent color--positive`
                : `balance-sheet__cell balance-sheet__cell--percent color--negative`
            }
          >
            {netAssetRatio.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default NetWorthSection;
