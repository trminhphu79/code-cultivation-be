export const QUERY_BUILDER_TOKEN = 'QUERY_BUILDER_TOKEN';

export const DEFAULT_QUERY_BUILDER_RESULT = {
  where: {},
  limit: 10,
  offset: 0,
  group: [],
  order: [],
};

export const DEFAULT_QUERY_BUILDER_RESULT_WITH_GROUP = {
  ...DEFAULT_QUERY_BUILDER_RESULT,
  group: ['id'],
};

export const DEFAULT_QUERY_BUILDER_RESULT_WITH_ORDER = {
  ...DEFAULT_QUERY_BUILDER_RESULT,
  order: [['id', 'ASC']],
};
