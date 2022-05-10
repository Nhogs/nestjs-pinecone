import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PineconeIndexService, PineconeVectorService } from './service';
import { PINECONE_CONFIG, PineconeConfig } from './interface';

@Module({
  providers: [PineconeIndexService, PineconeVectorService],
})
export class PineconeModule {
  static register(config: PineconeConfig): DynamicModule {
    return {
      module: PineconeModule,
      imports: [
        HttpModule.register({
          headers: {
            'Api-Key': config.apiKey,
            'Content-Type': 'application/json',
          },
        }),
      ],
      providers: [
        {
          provide: PINECONE_CONFIG,
          useValue: config,
        },
        PineconeIndexService,
        PineconeVectorService,
      ],
      exports: [PineconeIndexService, PineconeVectorService],
    };
  }

  // TODO add async
}
