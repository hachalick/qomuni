import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SendOtpSmsDto {
  @ApiProperty({
    description: 'number of mobile devices',
    default: '9XXXXXXXXX',
    pattern: '/^9[0-9]{9}$/',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  @MaxLength(10)
  @Matches(/^9[0-9]{9}$/)
  mobile: string;
}

export class ForgotTokenTelDto {
  @ApiProperty({
    description: 'number of mobile devices',
    default: '9XXXXXXXXX',
    pattern: '/^9[0-9]{9}$/',
    type: String,
  })
  @IsString()
  @Matches(/^9[0-9]{9}$/)
  @MinLength(10)
  @MaxLength(10)
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({
    description: 'otp sended to mobile device',
    default: 'XXXXXX',
    pattern: '/^[0-9]{6}$/',
    type: String,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  @IsNotEmpty()
  @Matches(/^[0-9]{6}$/)
  otp: string;
}

export class SignUpDto {
  @IsString()
  @MinLength(10)
  @MaxLength(10)
  @Matches(/^9[0-9]{9}$/)
  @IsNotEmpty()
  @ApiProperty({
    description: 'number of mobile devices',
    default: '9XXXXXXXXX',
    pattern: '/^9[0-9]{9}$/',
    type: String,
  })
  mobile: string;

  @ApiProperty({
    description: 'otp sended to mobile device',
    default: 'XXXXXX',
    pattern: '/^[0-9]{6}$/',
    type: String,
  })
  @IsString()
  @MinLength(6)
  @MaxLength(6)
  @IsNotEmpty()
  @Matches(/^[0-9]{6}$/)
  otp: string;

  @ApiProperty({
    description: 'password user',
    minimum: 5,
    default: '',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'number of mobile devices',
    default: '9XXXXXXXXX',
    pattern: '/^9[0-9]{9}$/',
    type: String,
  })
  @IsString()
  @Matches(/^9[0-9]{9}$/)
  @MinLength(10)
  @MaxLength(10)
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({
    description: 'otp sended to mobile device',
    default: 'XXXXXX',
    pattern: '/^[0-9]{6}$/',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{6}$/)
  @MinLength(6)
  @MaxLength(6)
  otp: string;

  @ApiProperty({
    description: 'password user',
    minimum: 5,
    default: '',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  new_password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    description: 'number of mobile devices',
    default: 'token',
    type: String,
  })
  @IsString()
  @Matches(/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+/)
  refresh_token: string;
}

export class SignInDto {
  @ApiProperty({
    description: 'number of mobile devices',
    default: '9XXXXXXXXX',
    pattern: '/^9[0-9]{9}$/',
    type: String,
  })
  @IsString()
  @Matches(/^9[0-9]{9}$/)
  @MinLength(10)
  @MaxLength(10)
  @IsNotEmpty()
  mobile: string;

  @ApiProperty({
    description: 'otp sended to mobile device',
    default: 'XXXXXX',
    pattern: '/^[0-9]{6}$/',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{6}$/)
  @MinLength(6)
  @MaxLength(6)
  otp: string;
}