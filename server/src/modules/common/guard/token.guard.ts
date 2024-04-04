import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { EErrorMessageJose } from 'src/modules/jwt/err.enum';
import { RefreshTokenDto } from 'src/auth/auth.dto';

@Injectable()
export class ExpRefreshTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { refresh_token }: RefreshTokenDto = request.body;
    if (!refresh_token)
      throw new HttpException('refresh_token not existed', HttpStatus.NOT_FOUND);
    try {
      await this.jwtService.verifyRefreshToken(refresh_token);
    } catch (error) {
      if (error.message === EErrorMessageJose.signature)
        throw new HttpException('token is broken', HttpStatus.NOT_ACCEPTABLE);
      else if (error.message === EErrorMessageJose.exp)
        throw new HttpException('token is expired', HttpStatus.NOT_ACCEPTABLE);
      else throw new HttpException(error.message, HttpStatus.NOT_ACCEPTABLE);
    }
    return true;
  }
}

@Injectable()
export class ExpAccessTokenGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const access_token = request.headers?.access_token;
    if (!access_token) {
      throw new HttpException('access_token not existed', HttpStatus.NOT_FOUND);
    } else if (typeof access_token === 'string') {
      const splitToken = access_token.split(' ');
      const bearer = splitToken[0];
      const token = splitToken[1];
      if (bearer !== 'Bearer') {
        throw new HttpException(
          'Bearer not existed',
          HttpStatus.BAD_REQUEST,
        );
      } else if (!token) {
        throw new HttpException('token not existed', HttpStatus.BAD_REQUEST);
      }
      try {
        await this.jwtService.verifyAccessToken(token);
      } catch (error) {
        if (error.message === EErrorMessageJose.exp)
          throw new HttpException('token expires', HttpStatus.GATEWAY_TIMEOUT);
        else
          throw new HttpException('token is broken', HttpStatus.NOT_ACCEPTABLE);
      }
    }
    return true;
  }
}
