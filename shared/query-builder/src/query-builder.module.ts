import { Module } from '@nestjs/common';
import { QueryBuilderService } from './query-builder.service';
import { QUERY_BUILDER_TOKEN } from './query-builder.constant';
@Module({
  controllers: [],
  providers: [
    {
      provide: QUERY_BUILDER_TOKEN,
      useClass: QueryBuilderService,
    },
  ],
  exports: [QUERY_BUILDER_TOKEN, QueryBuilderService],
})
export class QueryBuilderModule {}
