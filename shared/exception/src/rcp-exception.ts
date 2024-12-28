import { RpcException } from '@nestjs/microservices';
import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

export class CustomRpcException extends RpcException {
  constructor(
    public readonly statusCode: number,
    public override readonly message: string
  ) {
    super({ statusCode, message });
  }
}

@Catch(CustomRpcException)
export class GlobalRpcExceptionFilter implements RpcExceptionFilter {
  catch(exception: CustomRpcException, host: ArgumentsHost): Observable<any> {
    return throwError(() => ({
      statusCode: exception.statusCode,
      message: exception.message,
    }));
  }
}
