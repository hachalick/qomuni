import { Module } from '@nestjs/common';
import { GuardService } from './guard.service';
import { GuardGateway } from './guard.gateway';

@Module({
  providers: [GuardGateway, GuardService],
})
export class GuardModule {}
