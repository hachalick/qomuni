import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { CameraModule } from 'src/modules/camera/camera.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CameraEntity } from 'src/modules/entities/mysql/camera.entity';
import { JwtModule } from 'src/modules/jwt/jwt.module';
import { UserLicensePlatesEntity } from 'src/modules/entities/mysql/user-license-plates.entity';
import { CameraLocationEntity } from 'src/modules/entities/mysql/camera-location.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CameraEntity,
      UserLicensePlatesEntity,
      CameraLocationEntity,
    ]),
    CameraModule,
    JwtModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
