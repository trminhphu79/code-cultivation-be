import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { AccountAlert } from '@shared/alert/account';

@Injectable()
export class OwnerGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const userId = request.user?.profile?.id; // Assuming user ID is stored in request.user
    const profileId = request?.body?.id || request?.param?.id; // Assuming profileId is sent in the request body

    if (!profileId == userId) {
      throw new ForbiddenException(
        AccountAlert.DontHavePermissionToModifyProfile
      );
    }
    return true;
  }
}
