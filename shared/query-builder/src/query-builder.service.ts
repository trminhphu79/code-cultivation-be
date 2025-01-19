import { Injectable, Logger } from '@nestjs/common';
import { Op, WhereOptions as SequelizeWhereOptions, Order } from 'sequelize';
import {
  Filter,
  FilterType,
  QueryBuilderPayload,
  QueryBuilderResult,
  ValueType,
} from './query-builder.type';
import { DEFAULT_QUERY_BUILDER_RESULT } from './query-builder.constant';

@Injectable()
export class QueryBuilderService {
  private readonly logger = new Logger(QueryBuilderService.name);

  build(payload: QueryBuilderPayload): QueryBuilderResult {
    if (!payload.filters) {
      return DEFAULT_QUERY_BUILDER_RESULT;
    }

    try {
      const whereClause: SequelizeWhereOptions = {};

      Object.entries(payload.filters).forEach(([field, filter]) => {
        whereClause[field] = this.buildFilterCondition(filter);
      });

      const limitClause = payload.limit || DEFAULT_QUERY_BUILDER_RESULT.limit;

      const offsetClause =
        payload.offset || DEFAULT_QUERY_BUILDER_RESULT.offset;

      const orderClause =
        payload.sortBy && payload.sortOrder
          ? [[payload.sortBy, payload.sortOrder]]
          : [[]];

      const groupClause = payload.group || [];

      return {
        where: whereClause,
        order: orderClause as Order,
        limit: limitClause,
        offset: offsetClause,
        group: groupClause,
      };
    } catch (error) {
      this.logger.error('Error building query:', error);
      return DEFAULT_QUERY_BUILDER_RESULT;
    }
  }

  private buildFilterCondition(filter: Filter): any {
    const { value, valueType, filterType } = filter;

    try {
      switch (filterType) {
        case FilterType.EQUAL:
          return { [Op.eq]: this.parseValue(value, valueType) };

        case FilterType.NOT_EQUAL:
          return { [Op.ne]: this.parseValue(value, valueType) };

        case FilterType.LESS_THAN:
          return { [Op.lt]: this.parseValue(value, valueType) };

        case FilterType.LESS_THAN_OR_EQUAL:
          return { [Op.lte]: this.parseValue(value, valueType) };

        case FilterType.GREATER_THAN:
          return { [Op.gt]: this.parseValue(value, valueType) };

        case FilterType.GREATER_THAN_OR_EQUAL:
          return { [Op.gte]: this.parseValue(value, valueType) };

        case FilterType.BETWEEN:
          return this.buildBetweenCondition(value, valueType);

        case FilterType.NOT_BETWEEN:
          return { [Op.notBetween]: this.parseArrayValue(value, valueType) };

        case FilterType.IN:
          return { [Op.in]: this.parseArrayValue(value, valueType) };

        case FilterType.NOT_IN:
          return { [Op.notIn]: this.parseArrayValue(value, valueType) };

        case FilterType.LIKE:
          return { [Op.like]: `%${value}%` };

        case FilterType.NOT_LIKE:
          return { [Op.notLike]: `%${value}%` };

        case FilterType.I_LIKE:
          return { [Op.iLike]: `%${value}%` };

        case FilterType.NOT_I_LIKE:
          return { [Op.notILike]: `%${value}%` };

        case FilterType.DATE_RANGE:
          return this.buildDateRangeCondition(value);

        case FilterType.IS_NULL:
          return { [Op.is]: null };

        case FilterType.IS_NOT_NULL:
          return { [Op.not]: null };

        default:
          return {};
      }
    } catch (error) {
      this.logger.error(
        `Error building filter condition for type ${filterType}:`,
        error
      );
      return {};
    }
  }

  private parseValue(value: any, valueType: ValueType): any {
    try {
      switch (valueType) {
        case ValueType.NUMERIC:
          return Number(value);

        case ValueType.DATE:
          return new Date(value);

        case ValueType.BOOLEAN:
          return Boolean(value);

        case ValueType.ARRAY:
          return Array.isArray(value) ? value : [value];

        case ValueType.TEXT:
        default:
          return String(value);
      }
    } catch (error) {
      this.logger.error(`Error parsing value of type ${valueType}:`, error);
      return value;
    }
  }

  private parseArrayValue(value: any, valueType: ValueType): any[] {
    if (!Array.isArray(value)) {
      return [this.parseValue(value, valueType)];
    }
    return value.map((v) => this.parseValue(v, valueType));
  }

  private buildDateRangeCondition(value: any): any {
    if (Array.isArray(value) && value.length === 2) {
      return {
        [Op.between]: [new Date(value[0]), new Date(value[1])],
      };
    }
    return {};
  }

  private buildBetweenCondition(value: any, valueType: ValueType): any {
    if (Array.isArray(value) && value.length === 2) {
      const parsedValues = this.parseArrayValue(value, valueType);
      return { [Op.between]: parsedValues };
    }
    return {};
  }
}
