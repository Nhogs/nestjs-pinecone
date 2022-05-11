import { DynamicModule, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PineconeIndexService, PineconeVectorService } from './service';
import {
  PINECONE_CONFIG,
  PineconeConfig,
  PineconeModuleOptions,
} from './interface';

@Module({
  providers: [PineconeIndexService, PineconeVectorService],
})
export class PineconeModule {
  static register(config: PineconeConfig): DynamicModule {
    return {
      module: PineconeModule,
      imports: [HttpModule],
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

  static registerAsync(options: PineconeModuleOptions): DynamicModule {
    return {
      module: PineconeModule,
      imports: [HttpModule, ...options.imports],
      providers: [
        {
          provide: PINECONE_CONFIG,
          useFactory: options.useFactory,
          inject: options.inject || [],
        },
        PineconeIndexService,
        PineconeVectorService,
        ...(options.extraProviders || []),
      ],
      exports: [PineconeIndexService, PineconeVectorService],
    };
  }
}
