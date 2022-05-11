export const PINECONE_CONFIG = 'PINECONE_CONFIG';

export interface PineconeConfig {
  environment: string;
  project: string;
  apiKey: string;
  index?: string;
}

export interface PineconeModuleOptions {
  imports: any;
  inject: any;
  useFactory: any;
  extraProviders?: any;
}
