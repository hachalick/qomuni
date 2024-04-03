import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserLicensePlatesEntity } from 'src/modules/entities/mysql/user-license-plates.entity';
import { UserEntity } from 'src/modules/entities/mysql/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    @InjectRepository(UserLicensePlatesEntity)
    private readonly userLicensePlatesEntityRepository: Repository<UserLicensePlatesEntity>,
  ) {}

  async addLicensePlate({
    license_plate,
    number,
  }: {
    license_plate: string;
    number: string;
  }) {
    const user = await this.userEntityRepository.findOne({
      where: { mobile: number },
    });
    await this.userLicensePlatesEntityRepository.save({ user, license_plate });
    return { message: 'license plate add to req' };
  }

  async deleteLicensePlate({ uuid }: { uuid: string }) {
    const licensePlate = await this.userLicensePlatesEntityRepository.delete({
      user_license_plates_id: uuid,
    });
    return licensePlate.affected
      ? { message: 'license plate delete to req' }
      : { message: 'no license plate delete to req' };
  }

  async accessLicensePlateList({ number }: { number: string }) {
    const user = await this.userEntityRepository.findOne({
      where: { mobile: number },
    });
    const licensePlate = await this.userLicensePlatesEntityRepository.find({
      where: { user, isAccept: true },
    });
    return licensePlate ? licensePlate : [];
  }

  async getLicensePlateList({ number }: { number: string }) {
    const user = await this.userEntityRepository.findOne({
      where: { mobile: number },
    });
    const licensePlate = await this.userLicensePlatesEntityRepository.find({
      where: { user },
    });
    return licensePlate ? licensePlate : [];
  }
}

