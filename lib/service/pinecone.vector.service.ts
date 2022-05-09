import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { FetchResult, IndexStat, Query, QueryResults } from '../interface';

@Injectable()
export class PineconeVectorService {
  constructor(private readonly httpService: HttpService) {}

  describeIndexStats(): Observable<IndexStat> {
    return this.httpService.get<IndexStat>(`/describe_index_stats`).pipe(
      map((axiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }

  query(query: Query): Observable<QueryResults> {
    return this.httpService.post<QueryResults>(`/query`, query).pipe(
      map((axiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }

  // TODO...
  // delete(): Observable<IndexStat> {
  //   return this.httpService.get<IndexStat>(`/vectors/delete`).pipe(
  //     map((axiosResponse) => {
  //       return axiosResponse.data;
  //     }),
  //   );
  // }

  fetch(query: { ids: string[]; namespace?: string }): Observable<FetchResult> {
    const params =
      '?' +
      query.ids.map((id) => 'ids=' + encodeURI(id)).join('&') +
      (query.namespace ? '&namespace=' + query.namespace : '');

    console.log(params);

    return this.httpService.get<FetchResult>(`/vectors/fetch${params}`).pipe(
      map((axiosResponse) => {
        return axiosResponse.data;
      }),
    );
  }

  // TODO...
  // update(): Observable<IndexStat> {
  //   return this.httpService.get<IndexStat>(`/describe_index_stats`).pipe(
  //     map((axiosResponse) => {
  //       return axiosResponse.data;
  //     }),
  //   );
  // }
  //
  // upsert(): Observable<IndexStat> {
  //   return this.httpService.get<IndexStat>(`/describe_index_stats`).pipe(
  //     map((axiosResponse) => {
  //       return axiosResponse.data;
  //     }),
  //   );
  // }
}
