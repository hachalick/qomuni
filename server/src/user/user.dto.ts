import { ApiProperty } from '@nestjs/swagger';

export class LicensePlateDto {
  @ApiProperty({
    description: 'The license plate of user',
    default: 'NN-W-NNN-NN',
    type: String,
  })
  license_plate: string;
}

export class UUIDDto {
  @ApiProperty({
    description: 'The id of license plate',
    default: 'UUID',
    type: String,
  })
  uuid: string;
}
