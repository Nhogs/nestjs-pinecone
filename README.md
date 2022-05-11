[![nhogs logo](https://nhogs.com/nhogs_64.png)](https://github.com/Nhogs)

# @nhogs/nestjs-pinecone

[![pinecone logo](pinecone-logo.svg)Pinecone.io](https://www.pinecone.io/)
vector database module for nestjs

[![npm peer dependency version NestJS)](https://img.shields.io/npm/dependency-version/@nhogs/nestjs-pinecone/peer/@nestjs/core?label=Nestjs&logo=nestjs&logoColor=e0234e)](https://github.com/nestjs/nest)

## Installation

[![npm](https://img.shields.io/npm/v/@nhogs/nestjs-pinecone?label=%40nhogs%2Fnestjs-pinecone&logo=npm)](https://www.npmjs.com/package/@nhogs/nestjs-pinecone)

```bash
$ npm i --save @nhogs/nestjs-pinecone
```

## Usage

See [Pincone quickstart guide](https://www.pinecone.io/docs/quickstart/) for config details

### Use module in NestJS app

```typescript
@Module({
  imports: [
    PineconeModule.register({
      environment: 'YOUR_ENVIRONMENT', // Default is 'us-west1-gcp',
      project: 'YOUR_PROJECT', // Project id
      apiKey: 'YOUR_API_KEY', // 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
      index: 'YOUR_INDEX', // Optional index name
    }),
  ],
})
export class AppModule {}
```

### Async configuration example

```typescript
@Module({
  imports: [
    PineconeModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): PineconeConfig => {
        return {
          index: configService.get('PINECONE_INDEX'),
          project: configService.get('PINECONE_PROJECT'),
          environment: configService.get('PINECONE_ENV'),
          apiKey: configService.get('PINECONE_API_KEY'),
        };
      },
    }),
    ConfigModule.forRoot({
      envFilePath: './your/env/file/path/.env',
    }),
  ],
})
export class AsyncAppModule {}
```

## Index Operation Service
```typescript
  /**
   * Check environment and make sure your Pinecone API key works.
   */
  whoAmI(): Observable<WhoAmIResult> {}

  /**
   * This operation returns a list of your Pinecone indexes.
   */
  listIndexes(): Observable<string[]> {}

  /**
   * Get a description of an index.
   * @param indexName or default index set in config
   */
  describeIndex(indexName?: string): Observable<IndexDescriptionResult> {}
```

## Vector Operation Service

```typescript
  /**
   * The DescribeIndexStats operation returns statistics about the index's contents.
   * @param index index name
   */
  describeIndexStats(index?: string): Observable<IndexStatsResult> {...}

  /**
   * The Query operation searches a namespace, using one or more query vectors. It retrieves the ids of the most similar items in a namespace, along with their similarity scores.
   * @param query
   * @param index
   */
  query(query: Query, index?: string): Observable<QueryResults> {...}

  /**
   * The Delete operation deletes vectors, by id, from a single namespace. You can delete items by their id, from a single namespace.
   * @param del
   * @param index
   */
  delete(del: Delete, index?: string): Observable<DeleteResult> {...}

  /**
   * The Fetch operation looks up and returns vectors, by id, from a single namespace. The returned vectors include the vector data and/or metadata.
   * @param fetch
   * @param index
   */
  fetch(fetch: Fetch, index?: string): Observable<FetchResult> {...}

  /**
   * The Update operation updates vector in a namespace. If a value is included, it will overwrite the previous value. If a set_metadata is included, the values of the fields specified in it will be added or overwrite the previous value.
   * @param update
   * @param index
   */
  update(update: Update, index?: string): Observable<UpdateResult> {...}

  /**
   * The Upsert operation writes vectors into a namespace. If a new value is upserted for an existing vector id, it will overwrite the previous value.
   * @param upsert
   * @param index
   */
  upsert(upsert: Upsert, index?: string): Observable<UpsertResult> {...}
```