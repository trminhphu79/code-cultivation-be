import { Module } from '@nestjs/common';
import { QueryBuilderService } from './query-builder.service';
import { QUERY_BUILDER_TOKEN } from './query-builder.constant';
@Module({
  controllers: [],
  providers: [
    QueryBuilderService,
    {
      provide: QUERY_BUILDER_TOKEN,
      useClass: QueryBuilderService,
    },
  ],
  exports: [QUERY_BUILDER_TOKEN],
})
export class QueryBuilderModule {}
