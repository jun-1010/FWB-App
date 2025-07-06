import React, { useState, useEffect, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import type { ColDef } from 'ag-grid-community';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

ModuleRegistry.registerModules([AllCommunityModule]);

interface RowData {
  month: string;
  [key: string]: string | number;
}

const Portfolio: React.FC = () => {
  const [rowData, setRowData] = useState<RowData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasLoaded = useRef(false);

  // TODO: firestoreから取得
  const [colDefs, setColDefs] = useState<ColDef<RowData>[]>([
    { field: 'month', headerName: '月' },
    { field: 'cash', headerName: '現金' },
  ]);

  // ポートフォリオデータを一括取得（順番に処理）
  const loadPortfolioData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. 月の一覧を取得
      console.log('1. 月の一覧を取得中...');
      const portfolioRef = collection(db, 'users', 'demo-user', 'portfolio');
      const querySnapshot = await getDocs(portfolioRef);
      const months = querySnapshot.docs.map(doc => doc.id).sort();
      console.log('取得した月:', months);

      if (months.length === 0) {
        console.log('ポートフォリオデータが存在しません');
        return;
      }

      // 2. 最初の月からフィールド名を取得
      console.log('2. フィールド名を取得中...');
      const firstMonthDoc = doc(
        db,
        'users',
        'demo-user',
        'portfolio',
        months[0]
      );
      const firstMonthSnap = await getDoc(firstMonthDoc);

      if (!firstMonthSnap.exists()) {
        throw new Error('最初の月のデータが見つかりません');
      }

      const fieldNames = Object.keys(firstMonthSnap.data()).sort();
      console.log('取得したフィールド名:', fieldNames);

      // 3. 各月のデータを取得
      console.log('3. 各月のデータを取得中...');
      const portfolioData: RowData[] = [];

      for (const month of months) {
        const monthDoc = doc(db, 'users', 'demo-user', 'portfolio', month);
        const monthSnap = await getDoc(monthDoc);

        if (monthSnap.exists()) {
          const data = monthSnap.data();
          const rowData: RowData = { month };

          // 各フィールドの値を設定
          fieldNames.forEach(fieldName => {
            rowData[fieldName] = data[fieldName] || 0;
          });

          portfolioData.push(rowData);
        }
      }

      console.log('取得完了:', portfolioData);
      setRowData(portfolioData);
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'データ取得中にエラーが発生しました';
      setError(errorMessage);
      console.error('ポートフォリオデータ取得エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // コンポーネントマウント時にデータを取得（初回のみ）
  useEffect(() => {
    if (!hasLoaded.current) {
      hasLoaded.current = true;
      loadPortfolioData();
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        <h1>資産＆負債</h1>
        <p>データを読み込み中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>資産＆負債</h1>
        <p style={{ color: 'red' }}>エラー: {error}</p>
        <button onClick={loadPortfolioData}>再試行</button>
      </div>
    );
  }

  return (
    <div>
      <h1>資産＆負債</h1>
      {rowData.length > 0 ? (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
          <AgGridReact rowData={rowData} columnDefs={colDefs} />
        </div>
      ) : (
        <p>データがありません</p>
      )}
    </div>
  );
};

export default Portfolio;
