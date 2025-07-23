import React from 'react';
import type { AssetItem } from '../../types/assets';

interface BarMonthProps {
  monthlyAssetsData: {
    month: string;
    items: AssetItem[];
  };
  index: number;
  selectMonthIndex: number;
  onMonthSelect: (index: number) => void;
  calculateTotalAssets: (items: AssetItem[]) => number;
  calculateTotalLiabilities: (items: AssetItem[]) => number;
  maxBarHeight: number;
  maxAmount: number;
  isEmpty?: boolean;
  onAddMonth?: (month: number) => void;
}

const BarMonth: React.FC<BarMonthProps> = ({
  monthlyAssetsData,
  index,
  selectMonthIndex,
  onMonthSelect,
  calculateTotalAssets,
  calculateTotalLiabilities,
  maxBarHeight,
  maxAmount,
  isEmpty = false,
  onAddMonth,
}) => {
  // Empty状態の場合はプラスボタンを表示
  if (isEmpty) {
    return (
      <div className="bar__month" key={index}>
        <div
          className="bar__month-container"
          style={{
            height: `${maxBarHeight * 2}rem`,
            position: `relative`,
          }}
        >
          <button
            onClick={() => onAddMonth && onAddMonth(parseInt(monthlyAssetsData.month.replace(/^(\d{4})年(\d{1,2})月$/, '$2'), 10))}
            className="bar__button bar__button--empty"
            style={{
              height: `${maxBarHeight * 2}rem`,
            }}
          >
            +
          </button>
        </div>
        <div className="bar__month-label">{monthlyAssetsData.month.replace(/^(\d{4})年(\d{1,2})月$/, '$2月')}</div>
      </div>
    );
  }

  // 冗長な計算をまとめて変数化
  const totalAssets = calculateTotalAssets(monthlyAssetsData.items);
  const totalLiabilities = calculateTotalLiabilities(monthlyAssetsData.items);
  const netWorth = totalAssets - totalLiabilities;

  // すべての値が0の場合はZero状態として扱う
  const isAllZero = totalAssets === 0 && totalLiabilities === 0;

  if (isAllZero) {
    return (
      <div className="bar__month" key={index}>
        <div
          className="bar__month-container"
          style={{
            height: `${maxBarHeight * 2}rem`,
            position: `relative`,
          }}
        >
          <button
            onClick={() => onMonthSelect(index)}
            value={monthlyAssetsData.month}
            className={`bar__button ${selectMonthIndex === index ? 'bar__button--selected' : ''}`}
            style={{
              height: `${maxBarHeight * 2}rem`,
              position: `absolute`,
            }}
          >
            <div
              className="bar__rectangle bar__rectangle--empty"
              style={{
                height: `${maxBarHeight * 2}rem`,
              }}
            ></div>
          </button>
        </div>
        <div className="bar__month-label">{monthlyAssetsData.month.replace(/^(\d{4})年(\d{1,2})月$/, '$2月')}</div>
      </div>
    );
  }

  const assetsHeight = (totalAssets / maxAmount) * maxBarHeight;
  const liabilitiesHeight = (totalLiabilities / maxAmount) * maxBarHeight;
  const netWorthHeight = (Math.abs(netWorth) / maxAmount) * maxBarHeight;
  const buttonHeight = assetsHeight + liabilitiesHeight;

  const buttonTop = maxBarHeight - assetsHeight;
  const netWorthTop = netWorth > 0 ? assetsHeight - netWorthHeight - 0.2 + 'rem' : assetsHeight + 0.2 + 'rem';

  return (
    <div className="bar__month" key={index}>
      <div
        className="bar__month-container"
        style={{
          height: `${maxBarHeight * 2}rem`,
          position: `relative`,
        }}
      >
        <button
          onClick={() => onMonthSelect(index)}
          value={monthlyAssetsData.month}
          className={`bar__button ${selectMonthIndex === index ? 'bar__button--selected' : ''}`}
          style={{
            height: `${buttonHeight}rem`,
            position: `absolute`,
            top: `${buttonTop}rem`,
          }}
        >
          <div
            className="bar__rectangle bar__rectangle--assets"
            style={{
              height: `${assetsHeight}rem`,
            }}
          />
          <div
            className="bar__rectangle bar__rectangle--liabilities"
            style={{
              height: `${liabilitiesHeight}rem`,
            }}
          />
          <div
            className={
              `bar__rectangle bar__rectangle--net-worth ` +
              (netWorth > 0 ? 'bar__rectangle--net-worth--positive' : 'bar__rectangle--net-worth--negative')
            }
            style={{
              height: `${netWorthHeight}rem`,
              position: `absolute`,
              top: netWorthTop,
            }}
          />
        </button>
      </div>
      <div className="bar__month-label">{monthlyAssetsData.month.replace(/^(\d{4})年(\d{1,2})月$/, '$2月')}</div>
    </div>
  );
};

export default BarMonth;
