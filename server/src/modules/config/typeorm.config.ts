import { Injectable } from '@nestjs/common';
import { CameraEntity } from '../entities/mysql/camera.entity';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { OtpEntity } from '../entities/mysql/otp.entity';
import { LicensePlatesEntity } from '../entities/mysql/license-plates.entity';
import { CameraLocationEntity } from '../entities/mysql/camera-location.entity';
import { UserEntity } from '../entities/mysql/user.entity';
import { TokenUserTelegramEntity } from '../entities/mysql/token-user-telegram.entity';
import { UserLicensePlatesEntity } from '../entities/mysql/user-license-plates.entity';

@Injectable()
export class TypeOrmDbConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'mysql',
      port: this.configService.get('Db.port'),
      host: this.configService.get('Db.host'),
      username: this.configService.get('Db.username'),
      password: this.configService.get('Db.password'),
      database: this.configService.get('Db.database'),
      synchronize: true,
      entities: [
        OtpEntity,
        CameraEntity,
        LicensePlatesEntity,
        CameraLocationEntity,
        UserEntity,
        TokenUserTelegramEntity,
        UserLicensePlatesEntity,
      ],
    };
  }
}
