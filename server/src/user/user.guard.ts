import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLicensePlatesEntity } from 'src/modules/entities/mysql/user-license-plates.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExiLicensePlatesGuard implements CanActivate {
  constructor(
    @InjectRepository(UserLicensePlatesEntity)
    private readonly userLicensePlatesEntityRepository: Repository<UserLicensePlatesEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { uuid } = request.body;
    if (!uuid)
      throw new HttpException('uuid not existed', HttpStatus.NOT_FOUND);
    const licensePlate = await this.userLicensePlatesEntityRepository.find({
      where: { user_license_plates_id: uuid },
    });
    if (!licensePlate.length)
      throw new HttpException('uuid not existed', HttpStatus.NOT_FOUND);
    return true;
  }
}
