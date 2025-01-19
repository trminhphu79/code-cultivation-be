import { Inject } from '@nestjs/common';
import { QUERY_BUILDER_TOKEN } from './query-builder.constant';

export const InjectQueryBuilder = (): ParameterDecorator =>
  Inject(QUERY_BUILDER_TOKEN);
