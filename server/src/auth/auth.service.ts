import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { OtpEntity } from 'src/modules/entities/mysql/otp.entity';
import { TokenUserTelegramEntity } from 'src/modules/entities/mysql/token-user-telegram.entity';
import { UserEntity } from 'src/modules/entities/mysql/user.entity';
import { JwtService } from 'src/modules/jwt/jwt.service';
import { createOtp } from 'src/modules/utils/createOtp';
import { hashPassword, hashTokenTel } from 'src/modules/utils/hash';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(OtpEntity)
    private readonly otpRepository: Repository<OtpEntity>,
    @InjectRepository(TokenUserTelegramEntity)
    private readonly tokenUserTelegramEntityRepository: Repository<TokenUserTelegramEntity>,
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {}

  async sendOtpSms({ mobile }: { mobile: string }) {
    const otpSms = await this.otpRepository.findOneBy({ mobile });
    const otpCode = createOtp(6);
    const expires_in = new Date(new Date().getTime() + 60 * 2 * 1000);
    if (otpSms) {
      otpSms.expires_in = expires_in;
      otpSms.otp_code = otpCode;
      otpSms.isUsed = false;
      await this.otpRepository.save(otpSms);
    } else {
      const otp = this.otpRepository.create({
        otp_code: otpCode,
        expires_in,
        isUsed: false,
        mobile,
      });
      await this.otpRepository.save(otp);
    }
    console.log(otpCode); //dev-log
    return { message: 'otp sended' };
  }

  async forgotTokenTel({ mobile }: { mobile: string }) {
    const user = await this.userEntityRepository.findOneBy({ mobile });
    const tokenUser = await this.tokenUserTelegramEntityRepository.findOneBy({
      user,
    });
    const otpSms = await this.otpRepository.findOneBy({ mobile });
    otpSms.isUsed = true;
    await this.otpRepository.save(otpSms);
    return { message: 'auth is successfully', token_telegram: tokenUser.token };
  }

  async forgotPassword({
    mobile,
    new_password,
  }: {
    mobile: string;
    otp: string;
    new_password: string;
  }) {
    const hashPass = hashPassword(
      new_password,
      this.configService.get('App.token_hash_password'),
    );
    const user = await this.userEntityRepository.findOneBy({ mobile });
    user.password = hashPass;
    await this.userEntityRepository.save(user);
    const otpSms = await this.otpRepository.findOneBy({ mobile });
    otpSms.isUsed = true;
    await this.otpRepository.save(otpSms);
    return { message: 'changed password is successfully' };
  }

  async signUp({
    mobile,
    otp,
    password,
  }: {
    mobile: string;
    otp: string;
    password: string;
  }) {
    const hashPass = hashPassword(
      password,
      this.configService.get('App.token_hash_password'),
    );
    const tokenTelegram = hashTokenTel(
      mobile,
      this.configService.get('App.token_hash_telegram'),
    );
    const user = this.userEntityRepository.create({
      mobile,
      password: hashPass,
    });
    const userSaved = await this.userEntityRepository.save(user);
    const userTelegram = this.tokenUserTelegramEntityRepository.create({
      token: tokenTelegram,
      user: userSaved,
    });
    await this.tokenUserTelegramEntityRepository.save(userTelegram);
    const otpSms = await this.otpRepository.findOneBy({ mobile });
    otpSms.isUsed = true;
    await this.otpRepository.save(otpSms);
    return {
      message: 'created account successfully',
      token_telegram: tokenTelegram,
    };
  }

  async signIn({ mobile }: { mobile: string; otp: string }) {
    const otpSms = await this.otpRepository.findOneBy({ mobile });
    otpSms.isUsed = true;
    await this.otpRepository.save(otpSms);
    const access_token = await this.jwtService.createAccessToken({
      num: mobile,
    });
    const refresh_token = await this.jwtService.createRefreshToken({
      num: mobile,
    });
    return {
      access_token,
      refresh_token,
    };
  }

  async refreshToken(token: string) {
    const { aud, exp, iat, iss, jti, nbf, sub, ...arg } =
      await this.jwtService.verifyRefreshToken(token);
    const access_token = await this.jwtService.createAccessToken(arg);
    const refresh_token = await this.jwtService.createRefreshToken(arg);
    return {
      access_token,
      refresh_token,
    };
  }
}
