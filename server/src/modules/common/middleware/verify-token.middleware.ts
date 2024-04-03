import { Injectable, NestMiddleware } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NextFunction } from 'express';
import { UserEntity } from 'src/modules/entities/mysql/user.entity';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { Repository } from 'typeorm';

@Injectable()
export class VerifyTokenMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async use(req: any, res: Response, next: NextFunction) {
    const bearerToken = req.headers?.access_token;
    const token = bearerToken.split(' ')[1];
    if (token) {
      const { aud, exp, iat, iss, jti, nbf, sub, ...arg } =
        await this.jwtService.verifyAccessToken(token);
      const mobile = arg.num;
      if (typeof mobile === 'string') {
        const usersWithRole = await this.userEntityRepository
          .createQueryBuilder('user')
          .where('user.mobile = :mobile', { mobile })
          .leftJoinAndSelect('user.userRole', 'userRole')
          .leftJoinAndSelect('userRole.role', 'role')
          .getOne();
        req.headers = {
          ...req.headers,
          ...arg,
          role: usersWithRole.userRole.role.role,
        };
      }
    }
    next();
  }
}
