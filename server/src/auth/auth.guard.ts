import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { OtpEntity } from 'src/modules/entities/mysql/otp.entity';
import { UserEntity } from 'src/modules/entities/mysql/user.entity';
import { Repository } from 'typeorm';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   canActivate(
//     context: ExecutionContext,
//   ): boolean | Promise<boolean> | Observable<boolean> {
//     return true;
//   }
// }

@Injectable()
export class SendOtpSmsGuard implements CanActivate {
  constructor(
    @InjectRepository(OtpEntity)
    private readonly otpEntityRepository: Repository<OtpEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { mobile } = request.body;
    if (!mobile)
      throw new HttpException('mobile not existed', HttpStatus.BAD_REQUEST);
    const otp = await this.otpEntityRepository.findOneBy({ mobile });
    if (otp && otp.expires_in > new Date())
      throw new HttpException(
        'otp not yet expires',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    return true;
  }
}

@Injectable()
export class CheckOtpGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
    @InjectRepository(OtpEntity)
    private readonly otpEntityRepository: Repository<OtpEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { mobile, otp } = request.body;
    if (!mobile)
      throw new HttpException('mobile not existed', HttpStatus.NOT_FOUND);
    if (!otp)
      throw new HttpException(
        'otp not exists',
        HttpStatus.NOT_FOUND,
      );
    const otpSms = await this.otpEntityRepository.findOneBy({ mobile });
    if (!otpSms) {
      throw new HttpException(
        'The request for a otp code was not given',
        HttpStatus.BAD_REQUEST,
      );
    } else if (otpSms.isUsed) {
      throw new HttpException(
        'otp has been used',
        HttpStatus.NOT_FOUND,
      );
    } else if (otpSms.expires_in < new Date()) {
      throw new HttpException(
        'otp expired',
        HttpStatus.GATEWAY_TIMEOUT,
      );
    } else if (otpSms.otp_code !== otp) {
      otpSms.isUsed = true;
      this.otpEntityRepository.save(otpSms);
      throw new HttpException('otp not correct', HttpStatus.BAD_REQUEST);
    }
    return true;
  }
}

@Injectable()
export class ExistUserWithMobileGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { mobile } = request.body;
    if (!mobile)
      throw new HttpException('mobile not existed', HttpStatus.NOT_FOUND);
    const user = await this.userEntityRepository.findOneBy({ mobile });
    if (!user)
      throw new HttpException('user is not existed', HttpStatus.CONFLICT);
    return true;
  }
}

@Injectable()
export class NotExistUserWithMobileGuard implements CanActivate {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const { mobile } = request.body;
    if (!mobile)
      throw new HttpException('mobile not existed', HttpStatus.NOT_FOUND);
    const user = await this.userEntityRepository.findOneBy({ mobile });
    if (user) throw new HttpException('user is existed', HttpStatus.CONFLICT);
    return true;
  }
}