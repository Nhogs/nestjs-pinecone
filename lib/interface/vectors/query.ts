export interface QueryFilter {
  [key: string]: object;
}

export interface QueryVector {
  values: number[];
  topK?: number;
  namespace?: string;
  filter?: QueryFilter;
}

export interface Query {
  topK: number;
  queries: QueryVector[];
  namespace?: string;
  filter?: QueryFilter;
  includeValues?: boolean;
  includeMetadata?: boolean;
}
