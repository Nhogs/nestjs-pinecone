export interface IndexDescription {
  database: {
    dimension: number;
    index_config: {
      approximated: {
        hybrid: boolean;
      };
    };
    index_type: string;
    kind: string;
    metric: 'string';
    name: string;
    pod_type: string;
    pods: number;
    replicas: number;
    shards: number;
  };
  status: {
    crashed: string[];
    host: string;
    port: number;
    ready: boolean;
    state: string;
    waiting: string[];
  };
}
