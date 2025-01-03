import { Injectable, ExecutionContext } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottleGuard extends ThrottlerGuard {
  protected override getErrorMessage(context: ExecutionContext) {
    const message = 'Quá nhiều yêu cầu, vui lòng thử lại sau.';
    return Promise.resolve(message);
  }
}
