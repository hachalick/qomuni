import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { ERoleUser } from '../enum/role.enum';

@Injectable()
export class IsAdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request.headers.role;
    if (role !== ERoleUser.ADMIN)
      throw new HttpException('token not recognized', HttpStatus.FAILED_DEPENDENCY);
    return true;
  }
}

@Injectable()
export class IsUserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const role = request.headers.role;
    if (role !== ERoleUser.USER)
      throw new HttpException('token not recognized', HttpStatus.FAILED_DEPENDENCY);
    return true;
  }
}
