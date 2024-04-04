import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUUID, Matches, MaxLength, MinLength } from 'class-validator';

export class LicensePlateDto {
  @ApiProperty({
    description: 'The license plate of user',
    default: 'NN-W-NNN-NN',
    type: String,
  })
  @IsString()
  @MinLength(11)
  @MaxLength(11)
  @Matches(/^([۰۱۲۳۴۵۶۷۸۹]{2})-([ضصثقفغعهخحجچشسیبلاتنمکگپظطزرذدو]{1}|الف)-([۰۱۲۳۴۵۶۷۸۹]{3})-([۰۱۲۳۴۵۶۷۸۹]{2})$/)
  license_plate: string;
}

export class UUIDDto {
  @ApiProperty({
    description: 'The id of license plate',
    default: 'UUID',
    type: String,
  })
  @IsString()
  @MinLength(36)
  @MaxLength(36)
  @IsUUID()
  uuid: string;
}
