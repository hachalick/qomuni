import { Injectable } from '@nestjs/common';
import { SeenLicensePlate } from './dto/seen-license-plate-guard.dto';

@Injectable()
export class GuardService {
  create(seenLicensePlate: SeenLicensePlate) {
    return 'This action adds a new guard';
  }
}
