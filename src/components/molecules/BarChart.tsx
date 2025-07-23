import React from 'react';
import type { AssetItem, MonthlyAssets, AssetCategory } from '../../types/assets';
import BarMonth from '../atoms/BarMonth';

interface BarChartProps {
  monthlyAssetsData: MonthlyAssets[];
  selectMonthIndex: number;
  onMonthSelect: (index: number) => void;
  onAddMonth: (month: number) => void;
  calculateTotalAssets: (items: AssetItem[]) => number;
  calculateTotalLiabilities: (items: AssetItem[]) => number;
}

const BarChart: React.FC<BarChartProps> = ({
  monthlyAssetsData,
  selectMonthIndex,
  onMonthSelect,
  onAddMonth,
  calculateTotalAssets,
  calculateTotalLiabilities,
}) => {
  const maxBarHeight = 10;
  const maxAmounts = monthlyAssetsData.reduce(
    (acc, monthlyAssetsData) => {
      const totalAssets = calculateTotalAssets(monthlyAssetsData.items);
      const totalLiabilities = calculateTotalLiabilities(monthlyAssetsData.items);
      return {
        assets: Math.max(acc.assets, totalAssets),
        liabilities: Math.max(acc.liabilities, totalLiabilities),
      };
    },
    { assets: 0, liabilities: 0 }
  );
  const maxAmount = Math.max(maxAmounts.assets, maxAmounts.liabilities);

  return (
    <div className="content">
      <div className="content__title">資産推移</div>
      <div className="bar">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month, idx) => {
          // 各月に対応するデータを取得
          const dataIndex = monthlyAssetsData.findIndex(data => {
            const match = data.month.match(/^(\d{4})年(\d{1,2})月$/);
            if (match) {
              const m = parseInt(match[2], 10);
              return m === month;
            }
            return false;
          });

          if (dataIndex !== -1) {
            // データがある場合はBarMonthを表示
            return (
              <BarMonth
                key={month}
                monthlyAssetsData={monthlyAssetsData[dataIndex]}
                index={dataIndex}
                selectMonthIndex={selectMonthIndex}
                onMonthSelect={onMonthSelect}
                calculateTotalAssets={calculateTotalAssets}
                calculateTotalLiabilities={calculateTotalLiabilities}
                maxBarHeight={maxBarHeight}
                maxAmount={maxAmount}
              />
            );
          } else {
            // データがない場合はEmpty状態のBarMonthを表示
            const emptyMonthData = {
              month: `2025年${month}月`,
              items: [],
            };

            return (
              <BarMonth
                key={month}
                monthlyAssetsData={emptyMonthData}
                index={-1} // データが存在しないため-1
                selectMonthIndex={selectMonthIndex}
                onMonthSelect={onMonthSelect}
                calculateTotalAssets={calculateTotalAssets}
                calculateTotalLiabilities={calculateTotalLiabilities}
                maxBarHeight={maxBarHeight}
                maxAmount={maxAmount}
                isEmpty={true}
                onAddMonth={onAddMonth}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default BarChart;
