export interface Vector {
  id: string;
  values: number[];
  metadata?: object;
}

export interface Upsert {
  vectors: Vector[];
  namespace?: string;
}
