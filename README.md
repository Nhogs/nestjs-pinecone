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

```javascript
@Module({
  imports: [
    PineconeModule.register({
      environment: 'YOUR_ENVIRONMENT', // Default is 'us-west1-gcp',
      project: 'YOUR_PROJECT', // Project id
      apiKey: 'YOUR_API_KEY', // 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx',
    }),
  ],
})
export class AppModule {}
```
