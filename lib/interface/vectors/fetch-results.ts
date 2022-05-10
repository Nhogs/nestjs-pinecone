export interface VectorFetchResult {
  id: string;
  values: number[];
  metadata: object;
}

export interface FetchResult {
  vectors: {
    [key: string]: VectorFetchResult;
  };
}
