export interface VectorResult {
  id: string;
  score: number;
  values: number[];
  metadata: object;
}

export interface QueryResult {
  matches: VectorResult[];
  namespace: string;
}

export interface QueryResults {
  results: QueryResult[];
}
