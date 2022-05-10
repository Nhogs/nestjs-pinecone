import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import {
  Delete,
  DeleteResult,
  Fetch,
  FetchResult,
  IndexStatsResult,
  PINECONE_CONFIG,
  PineconeConfig,
  Query,
  QueryResults,
  Update,
  UpdateResult,
  Upsert,
  UpsertResult,
} from '../interface';

@Injectable()
export class PineconeVectorService {
  constructor(
    @Inject(PINECONE_CONFIG) private readonly config: PineconeConfig,
    private readonly httpService: HttpService,
  ) {}

  private indexUrl(target: string, index?: string) {
    return `https://${index ? index : this.config.index}-${
      this.config.project
    }.svc.${this.config.environment}.pinecone.io${target}`;
  }

  /**
   * The DescribeIndexStats operation returns statistics about the index's contents.
   * @param index index name
   */
  describeIndexStats(index?: string): Observable<IndexStatsResult> {
    const url = this.indexUrl('/describe_index_stats', index);

    return this.httpService.get<IndexStatsResult>(url).pipe(
      map((axiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }

  /**
   * The Query operation searches a namespace, using one or more query vectors. It retrieves the ids of the most similar items in a namespace, along with their similarity scores.
   * @param query
   * @param index
   */
  query(query: Query, index?: string): Observable<QueryResults> {
    const url = this.indexUrl('/query', index);

    return this.httpService.post<QueryResults>(url, query).pipe(
      map((axiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }

  /**
   * The Delete operation deletes vectors, by id, from a single namespace. You can delete items by their id, from a single namespace.
   * @param del
   * @param index
   */
  delete(del: Delete, index?: string): Observable<DeleteResult> {
    const url = this.indexUrl('/vectors/delete', index);

    return this.httpService.post<DeleteResult>(url, del).pipe(
      map((axiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }

  /**
   * The Fetch operation looks up and returns vectors, by id, from a single namespace. The returned vectors include the vector data and/or metadata.
   * @param fetch
   * @param index
   */
  fetch(fetch: Fetch, index?: string): Observable<FetchResult> {
    const params =
      '?' +
      fetch.ids.map((id) => 'ids=' + encodeURI(id)).join('&') +
      (fetch.namespace ? '&namespace=' + fetch.namespace : '');

    const url = this.indexUrl(`/vectors/fetch${params}`, index);

    return this.httpService.get<FetchResult>(url).pipe(
      map((axiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }

  /**
   * The Update operation updates vector in a namespace. If a value is included, it will overwrite the previous value. If a set_metadata is included, the values of the fields specified in it will be added or overwrite the previous value.
   * @param update
   * @param index
   */
  update(update: Update, index?: string): Observable<UpdateResult> {
    const url = this.indexUrl('/vectors/update', index);
    return this.httpService.post<UpdateResult>(url, update).pipe(
      map((axiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }

  /**
   * The Upsert operation writes vectors into a namespace. If a new value is upserted for an existing vector id, it will overwrite the previous value.
   * @param upsert
   * @param index
   */
  upsert(upsert: Upsert, index?: string): Observable<UpsertResult> {
    const url = this.indexUrl('/vectors/upsert', index);
    return this.httpService.post<UpsertResult>(url, upsert).pipe(
      map((axiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }
}
