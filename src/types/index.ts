export enum SortOption {
  ASC,
  DESC,
}

export enum ETableHeaderType {
  Number,
  Text,
}

export interface ITableHeader {
  key: string;
  label: string;
  type: ETableHeaderType;
  style?: React.CSSProperties;
  sortable?: boolean;
}

export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface ISort {
  sort: SortOption;
  key: string;
  type: ETableHeaderType;
}

export interface IPagination {
  perPage: number;
  page: number;
}
