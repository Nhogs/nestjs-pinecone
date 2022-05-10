export interface IndexStatsResult {
  namespaces: {
    [key: string]: { vectorCount: number };
  };
  dimension: number;
  indexFullness: number;
}
