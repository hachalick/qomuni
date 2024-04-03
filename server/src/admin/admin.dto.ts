import { ApiProperty } from '@nestjs/swagger';

export class UrlCamera {
  @ApiProperty({
    description: 'The url of IP Camera',
    default: 'http://213.47.219.147:89/mjpg/video.mjpg',
    type: String,
  })
  url: string;
}

export class IdCameraDto {
  @ApiProperty({
    description: 'The id of Camera',
    default: 1,
    type: Number,
  })
  camera_id: number;
}

export class IdUrlCameraDto {
  @ApiProperty({
    description: 'The id of Camera',
    default: 0,
    type: Number,
  })
  camera_id: number;

  @ApiProperty({
    description: 'The url of IP Camera',
    default: 'http://213.47.219.147:89/mjpg/video.mjpg',
    type: String,
  })
  url: string;
}

export class UUIDDto {
  @ApiProperty({
    description: 'The id of license plate',
    default: 'UUID',
    type: String,
  })
  uuid: string;
}

export class CameraLocation {
  @ApiProperty({
    description: 'The id of Camera',
    default: 0,
    type: Number,
  })
  camera_id: number;

  @ApiProperty({
    description: 'The lat of camera',
    default: 0.1,
    type: Number,
  })
  lat: number;

  @ApiProperty({
    description: 'The lang of camera',
    default: 0.1,
    type: Number,
  })
  long: number;
}