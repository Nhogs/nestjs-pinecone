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
    private readonly httpService: HttpService,
  ) {
    this._conf = {
      headers: {
        'Api-Key': this.config.apiKey,
        'Content-Type': 'application/json',
      },
    };
  }

  /**
   * HttpService config
   * @private
   */
  private _conf;

  private url(target: string) {
    return `https://controller.${this.config.environment}.pinecone.io${target}`;
  }

  /**
   * Check environment and make sure your Pinecone API key works.
   */
  whoAmI(): Observable<WhoAmIResult> {
    return this.httpService
      .get<WhoAmIResult>(this.url('/actions/whoami'), this._conf)
      .pipe(
        map((axiosResponse) => {
          return axiosResponse.data;
        }),
      );
  }

  /**
   * This operation returns a list of your Pinecone indexes.
   */
  listIndexes(): Observable<string[]> {
    return this.httpService
      .get<string[]>(this.url(`/databases`), this._conf)
      .pipe(
        map((axiosResponse) => {
          return axiosResponse.data;
        }),
      );
  }

  /**
   * Get a description of an index.
   * @param indexName or default index set in config
   */
  describeIndex(indexName?: string): Observable<IndexDescriptionResult> {
    return this.httpService
      .get<IndexDescriptionResult>(
        this.url(`/databases/${indexName ? indexName : this.config.index}`),
        this._conf,
      )
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
