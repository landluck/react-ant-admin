export type Partial<T> = {
  [P in keyof T]?: T[P];
};

export interface PageQueryParams {
  page: number;
  size: number;
}

export interface PageResponseData {
  dataTotal?: number;
  pageTotal?: number;
  page?: number;
  size?: number;
}

export interface QueryListResponseData<T> {
  list: T[];
  page: PageResponseData;
}
