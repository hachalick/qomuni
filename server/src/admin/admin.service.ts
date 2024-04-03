import { Injectable } from '@nestjs/common';
import { CameraEntity } from '../modules/entities/mysql/camera.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { parse } from 'persian_util';
import { CameraCore2Service } from 'src/modules/camera/camera-core2.service';
import { CameraCore1Service } from 'src/modules/camera/camera-core1.service';
import { UserLicensePlatesEntity } from 'src/modules/entities/mysql/user-license-plates.entity';
import { CameraLocationEntity } from 'src/modules/entities/mysql/camera-location.entity';

@Injectable()
export class AdminService {
  constructor(
    private readonly cameraCore1Service: CameraCore1Service,
    private readonly cameraCore2Service: CameraCore2Service,
    @InjectRepository(CameraEntity)
    private readonly cameraRepository: Repository<CameraEntity>,
    @InjectRepository(UserLicensePlatesEntity)
    private readonly userLicensePlatesRepository: Repository<UserLicensePlatesEntity>,
    @InjectRepository(CameraLocationEntity)
    private readonly cameraLocationRepository: Repository<CameraLocationEntity>,
  ) {}

  async acceptLicensePlate({ uuid }: { uuid: string }) {
    const lp = await this.userLicensePlatesRepository.findOne({
      where: { user_license_plates_id: uuid },
    });
    lp.isAccept = true;
    await this.userLicensePlatesRepository.save(lp);
    return { message: 'license plate accepted' };
  }

  async rejectLicensePlate({ uuid }: { uuid: string }) {
    const lp = await this.userLicensePlatesRepository.findOne({
      where: { user_license_plates_id: uuid },
    });
    lp.isAccept = false;
    await this.userLicensePlatesRepository.save(lp);
    return { message: 'license plate rejected' };
  }

  async createCamera({ url }: { url: string }) {
    const nesCamera = this.cameraRepository.create({
      url,
    });
    await this.cameraRepository.save(nesCamera);
    return { message: 'camera url added' };
  }

  async editCamera({ camera_id, url }: { camera_id: number; url: string }) {
    const camera = await this.cameraRepository.findOne({
      where: { id: camera_id },
    });
    camera.url = url;
    await this.cameraRepository.save(camera);
    return { message: 'camera url edited' };
  }

  async deleteCamera({ camera_id }: { camera_id: number }) {
    await this.cameraRepository.delete({ id: camera_id });
    return { message: 'camera id deleted' };
  }

  async setLocationCamera({
    camera_id,
    long,
    lat,
  }: {
    camera_id: number;
    lat: number;
    long: number;
  }) {
    const camera = await this.cameraRepository.findOne({
      where: { id: camera_id },
    });
    const cameraLocation = this.cameraLocationRepository.create({
      camera,
      lat,
      long,
    });
    await this.cameraLocationRepository.save(cameraLocation);
    return { message: 'set location of id camera' };
  }

  async editLocationCamera({
    camera_id,
    long,
    lat,
  }: {
    camera_id: number;
    lat: number;
    long: number;
  }) {
    const camera = await this.cameraRepository.findOne({
      where: { id: camera_id },
    });
    const cameraLocation = await this.cameraLocationRepository.findOne({
      where: { camera },
    });
    cameraLocation.lat = lat;
    cameraLocation.long = long;
    await this.cameraLocationRepository.save(cameraLocation);
    return { message: 'edit location of id camera' };
  }

  async deleteLocationCamera({ uuid }: { uuid: string }) {
    await this.cameraLocationRepository.delete({
      camera_location_id: uuid,
    });
    return { message: 'delete location of id camera' };
  }

  async startCore1Live({ camera_id }: { camera_id: number }) {
    const camera = await this.cameraRepository.findOneBy({ id: camera_id });
    const { url } = camera;
    this.cameraCore1Service.startLiveCamera({ id: camera_id, url });
    return {
      message: `ثبت لحظه دوربین شماره ${parse.En_To_Fa(String(camera_id))} شروع شد`,
    };
  }

  async startCore2Live({ camera_id }: { camera_id: number }) {
    const camera = await this.cameraRepository.findOneBy({
      id: camera_id,
    });
    const { url } = camera;
    this.cameraCore2Service.startLiveCamera({ id: camera_id, url });
    return {
      message: `ثبت لحظه دوربین شماره ${parse.En_To_Fa(String(camera_id))} شروع شد`,
    };
  }

  stopCore1Live({ camera_id }: { camera_id: number }) {
    this.cameraCore1Service.stopLiveCamera({
      id: camera_id,
    });
    return {
      message: `ثبت لحظه دوربین شماره ${parse.En_To_Fa(String(camera_id))} متوقف شد`,
    };
  }

  stopCore2Live({ camera_id }: { camera_id: number }) {
    this.cameraCore2Service.stopLiveCamera({
      id: camera_id,
    });
    return {
      message: `ثبت لحظه دوربین شماره ${parse.En_To_Fa(String(camera_id))} متوقف شد`,
    };
  }

  getListCameras() {
    return this.cameraRepository
      .createQueryBuilder('camera')
      .leftJoinAndSelect('camera.cameraLocationEntity', 'cameraLocationEntity')
      .getMany();
  }

  startCore1ProcessLive() {
    return this.cameraCore1Service.startProcessLive();
  }

  startCore2ProcessLive() {
    return this.cameraCore2Service.startProcessLive();
  }

  killCore1ProcessLive() {
    return this.cameraCore1Service.killProcessLive();
  }

  killCore2ProcessLive() {
    return this.cameraCore2Service.killProcessLive();
  }

  statusCore1ProcessLive() {
    return this.cameraCore1Service.statusProcessLive();
  }

  statusCore2ProcessLive() {
    return this.cameraCore2Service.statusProcessLive();
  }
}
