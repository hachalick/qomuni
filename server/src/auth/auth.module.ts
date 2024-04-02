import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity } from 'src/modules/entities/mysql/otp.entity';
import { TokenUserTelegramEntity } from 'src/modules/entities/mysql/token-user-telegram.entity';
import { UserEntity } from 'src/modules/entities/mysql/user.entity';
import { JwtModule } from 'src/modules/jwt/jwt.module';

@Module({
  imports: [
    JwtModule,
    TypeOrmModule.forFeature([OtpEntity, TokenUserTelegramEntity, UserEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
