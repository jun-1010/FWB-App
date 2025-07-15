import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

// Firebase設定
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Firebase初期化
const app = initializeApp(firebaseConfig);

// Firestore初期化
export const db = getFirestore(app);

/**
 * 指定ユーザー・年月・liquid資産IDのデータを更新（新規作成も可）
 * @param userId ユーザーID
 * @param yearMonth 年月（例: '2025-07'）
 * @param liquidId 資産ID（例: 'PayPay'など）
 * @param data 保存するデータ
 */
export async function updateLiquidAsset(
  userId: string,
  yearMonth: string,
  liquidId: string,
  data: {
    type: string;
    label: string;
    value: number;
    description?: string;
  }
) {
  const ref = doc(db, 'users', userId, 'assets', yearMonth, 'liquid', liquidId);
  await setDoc(ref, data, { merge: true });
}

export default app;
