import React, { useState, useEffect } from 'react';
import {
  doc,
  setDoc,
  getDoc,
  serverTimestamp,
  getDocs,
  collection,
} from 'firebase/firestore';
import { db } from '../firebase';

const getNextMonth = (month: string) => {
  const [year, m] = month.split('-').map(Number);
  let newYear = year;
  let newMonth = m + 1;
  if (newMonth > 12) {
    newYear += 1;
    newMonth = 1;
  }
  return `${newYear}-${String(newMonth).padStart(2, '0')}`;
};

const formatMonth = (month: string) => {
  const [year, m] = month.split('-');
  return `${year}/${Number(m)}`;
};

const Portfolio: React.FC = () => {
  // 複数月の管理
  const [months, setMonths] = useState<string[]>([]);
  // 各月の現金データ
  const [cashMap, setCashMap] = useState<{ [month: string]: string }>({});
  // 各月の保存状態
  const [saveStatus, setSaveStatus] = useState<{ [month: string]: string }>({});
  // 各月のローディング状態
  const [isLoading, setIsLoading] = useState<{ [month: string]: boolean }>({});

  // バリデーション
  const isValidCash = (cash: string) => cash === '' || /^[0-9]+$/.test(cash);

  // Firestoreからデータを取得
  const loadCashData = async (monthKey: string) => {
    try {
      const userId = 'demo-user';
      const docRef = doc(db, 'users', userId, 'portfolio', monthKey);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setCashMap(prev => ({
          ...prev,
          [monthKey]: data.cash ? data.cash.toString() : '',
        }));
      } else {
        setCashMap(prev => ({ ...prev, [monthKey]: '' }));
      }
    } catch (error) {
      // エラー時は空欄
      setCashMap(prev => ({ ...prev, [monthKey]: '' }));
    }
  };

  // Firestoreから月リストを取得
  useEffect(() => {
    const fetchMonths = async () => {
      const userId = 'demo-user';
      const colRef = collection(db, 'users', userId, 'portfolio');
      const snap = await getDocs(colRef);
      const monthList: string[] = [];
      snap.forEach(doc => monthList.push(doc.id));
      monthList.sort(); // 昇順
      setMonths(monthList);
    };
    fetchMonths();
  }, []);

  // 初回・月追加時にデータ取得
  useEffect(() => {
    months.forEach(month => {
      if (!(month in cashMap)) {
        loadCashData(month);
      }
    });
    // eslint-disable-next-line
  }, [months]);

  // 保存処理
  const saveField = async (
    userId: string,
    category: string,
    month: string,
    field: string,
    value: any
  ) => {
    const docRef = doc(db, 'users', userId, category, month);
    await setDoc(
      docRef,
      {
        [field]: value,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  };

  // inputがblurされた時の処理（現金）
  const handleCashBlur = async (month: string) => {
    const cash = cashMap[month] || '';
    if (!isValidCash(cash) || cash === '') return;
    setIsLoading(prev => ({ ...prev, [month]: true }));
    setSaveStatus(prev => ({ ...prev, [month]: '保存中...' }));
    try {
      await saveField('demo-user', 'portfolio', month, 'cash', parseInt(cash));
      setSaveStatus(prev => ({ ...prev, [month]: '保存完了' }));
      setTimeout(() => setSaveStatus(prev => ({ ...prev, [month]: '' })), 2000);
    } catch (error) {
      setSaveStatus(prev => ({ ...prev, [month]: '保存エラー' }));
    } finally {
      setIsLoading(prev => ({ ...prev, [month]: false }));
    }
  };

  // 月追加
  const handleAddMonth = () => {
    const lastMonth = months[months.length - 1];
    const next = getNextMonth(lastMonth);
    if (!months.includes(next)) {
      setMonths([...months, next]);
    }
  };

  return (
    <div>
      <h1>資産＆負債</h1>
      {/* <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th
              style={{
                border: '1px solid #ccc',
                padding: '4px',
                background: '#f7f7f7',
              }}
            ></th>
            {months.map(month => (
              <th
                key={month}
                style={{
                  border: '1px solid #ccc',
                  padding: '4px',
                  background: '#f7f7f7',
                }}
              >
                {formatMonth(month)}
              </th>
            ))}
            <th
              style={{
                border: '1px solid #ccc',
                padding: '4px',
                background: '#f7f7f7',
              }}
            >
              <button
                onClick={handleAddMonth}
                style={{ fontWeight: 'bold', fontSize: '1.1em' }}
              >
                ＋
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td
              style={{
                border: '1px solid #ccc',
                padding: '4px',
                background: '#fafafa',
                fontWeight: 'bold',
              }}
            >
              現金
            </td>
            {months.map(month => (
              <td
                key={month}
                style={{ border: '1px solid #ccc', padding: '4px' }}
              >
                <input
                  type="text"
                  value={cashMap[month] ?? ''}
                  onChange={e => {
                    const val = e.target.value;
                    setCashMap(prev => ({ ...prev, [month]: val }));
                  }}
                  onBlur={() => handleCashBlur(month)}
                  disabled={isLoading[month]}
                  style={{ width: '70px' }}
                  placeholder="例: 100000"
                />
                {!isValidCash(cashMap[month] ?? '') && (
                  <div style={{ color: 'red', fontSize: '0.8em' }}>
                    半角数字で入力
                  </div>
                )}
                {saveStatus[month] && (
                  <div
                    style={{
                      color: saveStatus[month].includes('エラー')
                        ? 'red'
                        : 'green',
                      fontSize: '0.8em',
                    }}
                  >
                    {saveStatus[month]}
                  </div>
                )}
              </td>
            ))}
            <td
              style={{
                border: '1px solid #ccc',
                padding: '4px',
                background: '#fafafa',
              }}
            ></td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
};

export default Portfolio;
