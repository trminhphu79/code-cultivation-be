import { throwError } from 'rxjs';
import { CustomRpcException } from './rcp-exception';

export const throwException = (code: number, message: string) =>
  throwError(() => {
    return new CustomRpcException(code, message);
  });
