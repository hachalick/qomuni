import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { UserEntity } from 'src/modules/entities/mysql/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerifyTokenMiddleware } from 'src/modules/common/middleware/verify-token.middleware';
import { UserLicensePlatesEntity } from 'src/modules/entities/mysql/user-license-plates.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserLicensePlatesEntity]), JwtModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VerifyTokenMiddleware).forRoutes('/user/*');
  }
}
