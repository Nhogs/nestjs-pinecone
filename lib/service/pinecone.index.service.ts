import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, Observable } from 'rxjs';
import { IndexDescription } from '../interface';

@Injectable()
export class PineconeIndexService {
  constructor(private httpService: HttpService) {}

  listIndexes(): Observable<string[]> {
    return this.httpService
      .get<string[]>(`https://controller.us-west1-gcp.pinecone.io/databases`)
      .pipe(
        map((axiosResponse) => {
          return axiosResponse.data;
        }),
      );
  }

  describeIndex(indexName: string): Observable<IndexDescription> {
    return this.httpService
      .get<IndexDescription>(
        `https://controller.us-west1-gcp.pinecone.io/databases/${indexName}`,
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
