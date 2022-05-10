export const PINECONE_CONFIG = 'PINECONE_CONFIG';

export interface PineconeConfig {
  environment: string;
  project: string;
  apiKey: string;
  index?: string;
}

// TODO for async config
// export interface PineconeConfigFactory {
//   createPineconeConfig(): Promise<PineconeConfig> | PineconeConfig;
// }
//
// export interface PineconeAsyncConfig
//   extends Pick<ModuleMetadata, 'imports'> {
//   useFactory?: (
//       ...args: any[]
//   ) => Promise<PineconeConfig> | PineconeConfig;
//   inject?: any[];
//   extraProviders?: Provider[];
// }
