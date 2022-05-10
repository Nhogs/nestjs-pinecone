interface VectorResult {
  id: string;
  score: number;
  values: number[];
  metadata: object;
}

interface QueryResult {
  matches: VectorResult[];
  namespace: string;
}

export interface QueryResults {
  results: QueryResult[];
}
