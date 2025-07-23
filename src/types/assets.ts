export interface AssetItem {
  id: string;
  label: string;
  amount: number;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssetCategory {
  id: string;
  label: string;
  type: 'asset' | 'liability';
  order: number;
}

export interface MonthlyAssets {
  month: string;
  items: AssetItem[];
}
