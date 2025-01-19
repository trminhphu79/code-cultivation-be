import { Op } from 'sequelize';
import { Order, WhereAttributeHash, WhereOptions } from 'sequelize/types/model';

export enum FilterType {
  EQUAL = 'equal',
  NOT_EQUAL = 'notEqual',
  LESS_THAN = 'lessThan',
  LESS_THAN_OR_EQUAL = 'lessThanOrEqual',
  GREATER_THAN = 'greaterThan',
  GREATER_THAN_OR_EQUAL = 'greaterThanOrEqual',
  BETWEEN = 'between',
  NOT_BETWEEN = 'notBetween',
  IN = 'in',
  NOT_IN = 'notIn',
  LIKE = 'like',
  NOT_LIKE = 'notLike',
  I_LIKE = 'iLike',
  NOT_I_LIKE = 'notILike',
  DATE_RANGE = 'dateRange',
  IS_NULL = 'isNull',
  IS_NOT_NULL = 'isNotNull',
}

export enum ValueType {
  TEXT = 'text',
  NUMERIC = 'numeric',
  DATE = 'date',
  BOOLEAN = 'boolean',
  ARRAY = 'array',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface Filter {
  value: string | number | boolean | Array<string | number | Date> | null;
  valueType: ValueType;
  filterType: FilterType;
}

export interface QueryBuilderPayload {
  filters: Record<string, Filter>;
  offset: number;
  limit: number;
  sortBy: string;
  sortOrder: SortOrder;
  group: string[];
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: SortOrder;
}

export type Operator = keyof typeof Op;

export interface FilterCondition {
  field: string;
  operator: Operator;
  value: any;
}

export interface SearchCondition {
  fields: string[];
  value: string;
}

export interface RangeCondition {
  field: string;
  from: number | Date;
  to: number | Date;
}

export interface BuildWhereOptions {
  filters?: FilterCondition[];
  search?: SearchCondition;
  ranges?: RangeCondition[];
  exactMatches?: Record<string, any>;
}

export interface QueryOptions extends PaginationOptions {
  where?: WhereOptions;
  include?: any[];
  attributes?: string[];
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
}

export interface QueryResponse<T> {
  data: T[];
  meta: PaginationMeta;
  message?: string;
}

export interface QueryBuilderResult {
  where: WhereAttributeHash;
  limit: number;
  offset: number;
  order: Order;
  group: string[];
}
