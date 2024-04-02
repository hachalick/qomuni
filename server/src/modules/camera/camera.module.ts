import { Module } from '@nestjs/common';
import { CameraCore1Service } from './camera-core1.service';
import { CameraCore2Service } from './camera-core2.service';

@Module({
  providers: [CameraCore1Service, CameraCore2Service],
  exports: [CameraCore1Service, CameraCore2Service]
})
export class CameraModule {}
