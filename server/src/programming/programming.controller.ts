import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProgrammingService } from './programming.service';

@ApiTags('programming')
@Controller('programming')
export class ProgrammingController {
  constructor(private readonly programmingService: ProgrammingService) {}

  @Get('initialization-table')
  @HttpCode(HttpStatus.CREATED)
  initializationTable() {
    return this.programmingService.initializationTable();
  }
}
