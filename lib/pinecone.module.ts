import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PineconeIndexService, PineconeVectorService } from './service';
import { PineconeConfig } from './interface';

@Module({
  providers: [PineconeIndexService, PineconeVectorService],
})
export class PineconeModule {
  static forRoot(config: PineconeConfig): DynamicModule {
    return {
      imports: [
        HttpModule.register({
          baseURL: config.host,
          headers: {
            'Api-Key': config.apiKey,
            'Content-Type': 'application/json',
          },
        }),
      ],
      module: PineconeModule,
      global: true,
      providers: [PineconeIndexService, PineconeVectorService],
      exports: [PineconeIndexService, PineconeVectorService],
    };
  }

  // TODO add async
}
