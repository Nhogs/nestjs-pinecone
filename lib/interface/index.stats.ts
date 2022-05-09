export interface IndexStat {
  namespaces: {
    [key: string]: { vectorCount: number };
  };
  dimension: number;
  indexFullness: number;
}
