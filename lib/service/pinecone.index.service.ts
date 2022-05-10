import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import {
  IndexDescriptionResult,
  PINECONE_CONFIG,
  PineconeConfig,
  WhoAmIResult,
} from '../interface';

@Injectable()
export class PineconeIndexService {
  constructor(
    @Inject(PINECONE_CONFIG) private readonly config: PineconeConfig,
    private httpService: HttpService,
  ) {}

  private url(target: string) {
    return `https://controller.${this.config.environment}.pinecone.io${target}`;
  }

  whoAmI(): Observable<WhoAmIResult> {
    return this.httpService.get<WhoAmIResult>(this.url('/actions/whoami')).pipe(
      map((axiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }

  listIndexes(): Observable<string[]> {
    return this.httpService.get<string[]>(this.url(`/databases`)).pipe(
      map((axiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }

  describeIndex(indexName: string): Observable<IndexDescriptionResult> {
    return this.httpService
      .get<IndexDescriptionResult>(this.url(`/databases/${indexName}`))
      .pipe(
        map((axiosResponse) => {
          return axiosResponse.data;
        }),
      );
  }

  // TODO if needed...
  // create_index https://www.pinecone.io/docs/api/operation/create_index/
  // delete_index
  // scale_index
}
