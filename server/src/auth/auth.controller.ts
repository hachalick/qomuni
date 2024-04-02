import { Body, Controller, Post, Put, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  ForgotPasswordDto,
  ForgotTokenTelDto,
  RefreshTokenDto,
  SendOtpSmsDto,
  SignInDto,
  SignUpDto,
} from './auth.dto';
import {
  ExistUserWithMobileGuard,
  CheckOtpGuard,
  SendOtpSmsGuard,
  NotExistUserWithMobileGuard,
} from './auth.guard';
import { ExpRefreshTokenGuard } from 'src/modules/common/guard/token.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp-sms')
  @UseGuards(SendOtpSmsGuard)
  sendOtpSms(@Body() body: SendOtpSmsDto) {
    return this.authService.sendOtpSms(body);
  }

  @Post('sign-up')
  @UseGuards(CheckOtpGuard)
  @UseGuards(NotExistUserWithMobileGuard)
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @Post('sign-in')
  @UseGuards(CheckOtpGuard)
  signIn(@Body() body: SignInDto) {
    return this.authService.signIn(body);
  }

  @Put('refresh-token')
  @UseGuards(ExpRefreshTokenGuard)
  refreshToken(@Body() body: RefreshTokenDto) {
    return this.authService.refreshToken(body.refresh_token);
  }

  @Put('forgot-password')
  @UseGuards(CheckOtpGuard)
  @UseGuards(ExistUserWithMobileGuard)
  forgotPassword(@Body() body: ForgotPasswordDto) {
    return this.authService.forgotPassword(body);
  }

  @Put('forgot-token-tel')
  @UseGuards(CheckOtpGuard)
  @UseGuards(ExistUserWithMobileGuard)
  forgotTokenTel(@Body() body: ForgotTokenTelDto) {
    return this.authService.forgotTokenTel(body);
  }
}
