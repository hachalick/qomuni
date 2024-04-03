import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { ExpAccessTokenGuard } from 'src/modules/common/guard/token.guard';
import { LicensePlateDto, UUIDDto } from './user.dto';
import { ExiLicensePlatesGuard } from './user.guard';
import { IsUserGuard } from 'src/modules/common/guard/role.guard';

@Controller('user')
@ApiTags('User')
@ApiHeader({
  name: 'access_token',
  description: 'Bearer token',
  required: true,
  example: 'Bearer token',
})
@UseGuards(ExpAccessTokenGuard)
@UseGuards(IsUserGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('add-req-license-plate')
  addLicensePlate(
    @Headers() header: { num: string },
    @Body() licensePlateDto: LicensePlateDto,
  ) {
    return this.userService.addLicensePlate({
      ...licensePlateDto,
      number: header.num,
    });
  }

  @Delete('delete-req-license-plate')
  @UseGuards(ExiLicensePlatesGuard)
  deleteLicensePlate(@Body() uuid: UUIDDto) {
    return this.userService.deleteLicensePlate(uuid);
  }

  @Get('access-license-plate-list')
  accessLicensePlateList(@Headers() header: { num: string }) {
    return this.userService.accessLicensePlateList({
      number: header.num,
    });
  }

  @Get('req-license-plate-list')
  getLicensePlateList(@Headers() header: { num: string }) {
    return this.userService.getLicensePlateList({ number: header.num });
  }
}
