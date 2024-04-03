import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from 'src/modules/entities/mysql/otp.entity';
import { TokenUserTelegramEntity } from 'src/modules/entities/mysql/token-user-telegram.entity';
import { UserEntity } from 'src/modules/entities/mysql/user.entity';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { UserRoleEntity } from 'src/modules/entities/mysql/user-role.entity';
import { RoleEntity } from 'src/modules/entities/mysql/role.entity';
import { VerifyTokenMiddleware } from 'src/modules/common/middleware/verify-token.middleware';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([
      UserRoleEntity,
      RoleEntity,
      OtpEntity,
      TokenUserTelegramEntity,
      UserEntity,
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes('/admin/*');
  }
}
