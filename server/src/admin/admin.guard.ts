import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CameraLocationEntity } from 'src/modules/entities/mysql/camera-location.entity';
import { CameraEntity } from 'src/modules/entities/mysql/camera.entity';
import { UserLicensePlatesEntity } from 'src/modules/entities/mysql/user-license-plates.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExiIdLicensePlateGuard implements CanActivate {
  constructor(
    @InjectRepository(UserLicensePlatesEntity)
    private readonly userLicensePlatesRepository: Repository<UserLicensePlatesEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { uuid } = request.body;
    const exiLP = await this.userLicensePlatesRepository.findOne({
      where: { user_license_plates_id: uuid },
    });
    if (!exiLP) {
      throw new HttpException('شناسه پلاک وجود ندارد', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}

@Injectable()
export class ExiIdCameraGuard implements CanActivate {
  constructor(
    @InjectRepository(CameraEntity)
    private readonly cameraRepository: Repository<CameraEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { camera_id, url } = request.body;
    if (!camera_id) {
      throw new HttpException('شناسه دوربین وجود ندارد', HttpStatus.NOT_FOUND);
    }
    const camera = await this.cameraRepository.findOne({
      where: { id: camera_id },
    });
    if (!camera) {
      throw new HttpException('شناسه دوربین وجود ندارد', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}

@Injectable()
export class NotExiCameraGuard implements CanActivate {
  constructor(
    @InjectRepository(CameraLocationEntity)
    private readonly cameraLocationRepository: Repository<CameraLocationEntity>,
    @InjectRepository(CameraEntity)
    private readonly cameraRepository: Repository<CameraEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { camera_id } = request.body;
    const camera = await this.cameraRepository.findOne({
      where: { id: camera_id },
    });
    const cameraLocation = await this.cameraLocationRepository.findOne({
      where: { camera },
    });
    if (cameraLocation) {
      throw new HttpException(
        'مختصات دوربین وجود دارد',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return true;
  }
}

@Injectable()
export class ExiCameraGuard implements CanActivate {
  constructor(
    @InjectRepository(CameraLocationEntity)
    private readonly cameraLocationRepository: Repository<CameraLocationEntity>,
    @InjectRepository(CameraEntity)
    private readonly cameraRepository: Repository<CameraEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { camera_id } = request.body;
    const camera = await this.cameraRepository.findOne({
      where: { id: camera_id },
    });
    const cameraLocation = await this.cameraLocationRepository.findOne({
      where: { camera },
    });
    if (!cameraLocation) {
      throw new HttpException(
        'مختصات دوربین وجود ندارد',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return true;
  }
}

@Injectable()
export class ExiIdCameraLocationGuard implements CanActivate {
  constructor(
    @InjectRepository(CameraLocationEntity)
    private readonly cameraLocationRepository: Repository<CameraLocationEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { uuid } = request.body;
    if (!uuid) {
      throw new HttpException('شناسه دوربین وجود ندارد', HttpStatus.NOT_FOUND);
    }
    const cameraLocation = await this.cameraLocationRepository.findOne({
      where: { camera_location_id: uuid },
    });
    if (!cameraLocation) {
      throw new HttpException('شناسه دوربین وجود ندارد', HttpStatus.NOT_FOUND);
    }
    return true;
  }
}
