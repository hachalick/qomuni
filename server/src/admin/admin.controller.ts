import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  CameraLocation,
  IdCameraDto,
  UUIDDto,
  IdUrlCameraDto,
  UrlCamera,
} from './admin.dto';
import { AdminService } from './admin.service';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ExpAccessTokenGuard } from 'src/modules/common/guard/token.guard';
import { IsAdminGuard } from 'src/modules/common/guard/role.guard';
import { ExiCameraGuard, ExiIdCameraGuard, ExiIdCameraLocationGuard, ExiIdLicensePlateGuard, NotExiCameraGuard } from './admin.guard';

@Controller('admin')
@ApiTags('Admin')
@ApiHeader({
  name: 'access_token',
  description: 'Bearer token',
  required: true,
  example: 'Bearer token',
})
@UseGuards(ExpAccessTokenGuard)
@UseGuards(IsAdminGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('accept-license-plate')
  @UseGuards(ExiIdLicensePlateGuard)
  acceptLicensePlate(@Body() uuid: UUIDDto) {
    return this.adminService.acceptLicensePlate(uuid);
  }

  @Delete('reject-license-plate')
  @UseGuards(ExiIdLicensePlateGuard)
  rejectLicensePlate(@Body() uuid: UUIDDto) {
    return this.adminService.rejectLicensePlate(uuid);
  }

  @Post('add-camera')
  addCamera(@Body() urlCamera: UrlCamera) {
    return this.adminService.createCamera(urlCamera);
  }

  @Put('edit-camera')
  @UseGuards(ExiIdCameraGuard)
  editCamera(@Body() idUrlCameraDto: IdUrlCameraDto) {
    return this.adminService.editCamera(idUrlCameraDto);
  }

  @Delete('delete-camera')
  @UseGuards(ExiIdCameraGuard)
  deleteCamera(@Body() idCameraDto: IdCameraDto) {
    return this.adminService.deleteCamera(idCameraDto);
  }

  @Post('set-location-camera')
  @UseGuards(NotExiCameraGuard)
  @UseGuards(ExiIdCameraGuard)
  setLocationCamera(@Body() cameraLocation: CameraLocation) {
    return this.adminService.setLocationCamera(cameraLocation);
  }
  
  @Put('edit-location-camera')
  @UseGuards(ExiCameraGuard)
  @UseGuards(ExiIdCameraGuard)
  editLocationCamera(@Body() cameraLocation: CameraLocation) {
    return this.adminService.editLocationCamera(cameraLocation);
  }
  
  @Delete('delete-location-camera')
  @UseGuards(ExiIdCameraLocationGuard)
  deleteLocationCamera(@Body() uuid: UUIDDto) {
    return this.adminService.deleteLocationCamera(uuid);
  }

  @Post('start-core1-live')
  startCore1Live(@Body() idCameraDto: IdCameraDto) {
    return this.adminService.startCore1Live(idCameraDto);
  }

  @Post('start-core2-live')
  startCore2Live(@Body() idCameraDto: IdCameraDto) {
    return this.adminService.startCore2Live(idCameraDto);
  }

  @Delete('stop-core1-live')
  stopCore1Live(@Body() idCameraDto: IdCameraDto) {
    return this.adminService.stopCore1Live(idCameraDto);
  }

  @Delete('stop-core2-live')
  stopCore2Live(@Body() idCameraDto: IdCameraDto) {}

  @Get('list-camera')
  getListCamera() {
    return this.adminService.getListCameras();
  }

  @Get('start-core1-live-process')
  startCore1ProcessLive() {
    return this.adminService.startCore1ProcessLive();
  }

  @Get('start-core2-live-process')
  starCore2LiveProcess() {
    return this.adminService.startCore2ProcessLive();
  }

  @Get('kill-core1-live-process')
  killCore1ProcessLive() {
    return this.adminService.killCore1ProcessLive();
  }

  @Get('kill-core2-live-process')
  killCore2ProcessLive() {
    return this.adminService.killCore2ProcessLive();
  }

  @Get('restart-core1-live-process')
  restartCore1ProcessLive() {
    this.adminService.killCore1ProcessLive();
    return this.adminService.startCore1ProcessLive();
  }

  @Get('restart-core2-live-process')
  restartCore2ProcessLive() {
    this.adminService.killCore2ProcessLive();
    return this.adminService.startCore2ProcessLive();
  }

  @Get('status-core1-live-process')
  statusCore1ProcessLive() {
    return this.adminService.statusCore1ProcessLive();
  }

  @Get('status-core2-live-process')
  statusCore2ProcessLive() {
    return this.adminService.statusCore2ProcessLive();
  }
}
